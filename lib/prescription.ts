import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Prescription 타입 정의
export interface Prescription {
	code: string;
	name?: string;
	dear?: string;
	letter?: string;
	concept?: string;
	movie?: string;
	challengeConcept?: string;
	challengeKeyword?: string;
	challengeActivity?: string;
	maintainConcept?: string;
	maintainKeyword?: string;
	maintainActivity?: string;
	reconcileConcept?: string;
	reconcileKeyword?: string;
	reconcileActivity?: string;
}

// S3 클라이언트 설정
const s3Client = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION || "ap-northeast-2",
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
	},
	forcePathStyle: true, // Supabase S3 호환 스토리지에 필요
});

const BUCKET_NAME = process.env.STORAGE_BUCKET || "goat_data";
const PRESCRIPTION_PREFIX = ""; // 버킷 루트에서 검색 (경로 확인용)

// 버킷에서 prescription을 가져오는 함수
export async function getPrescriptionFromBucket(code: string): Promise<Prescription | null> {
	try {
		// 먼저 개별 파일 시도 (예: pesma.json)
		try {
			const command = new GetObjectCommand({
				Bucket: BUCKET_NAME,
				Key: `${code.toLowerCase()}.json`,
			});

			const response = await s3Client.send(command);

			if (response.Body) {
				const bodyString = await response.Body.transformToString();
				const prescription = JSON.parse(bodyString) as Prescription;
				return prescription;
			}
		} catch (individualError: any) {
			// 개별 파일이 없으면 prescriptions.json에서 찾기
			console.log(`Individual file ${code}.json not found, checking prescriptions.json`);
		}

		// prescriptions.json에서 찾기
		const allPrescriptions = await getAllPrescriptionsFromBucket();
		const prescription = allPrescriptions.find((p) => p.code.toLowerCase() === code.toLowerCase());

		if (prescription) {
			return prescription;
		}

		console.log(`Prescription ${code} not found in bucket`);
		return null;
	} catch (error: any) {
		console.error(`Error fetching prescription ${code}:`, error);
		return null;
	}
} // 모든 prescription 목록을 가져오는 함수
export async function getAllPrescriptionsFromBucket(): Promise<Prescription[]> {
	try {
		console.log("📦 Fetching prescriptions from bucket:", BUCKET_NAME);

		// prescriptions.json 파일에서 전체 목록 가져오기
		const getCommand = new GetObjectCommand({
			Bucket: BUCKET_NAME,
			Key: "prescriptions.json",
		});

		const response = await s3Client.send(getCommand);

		if (!response.Body) {
			console.log("❌ prescriptions.json not found");
			return [];
		}

		const bodyString = await response.Body.transformToString();
		console.log("📄 prescriptions.json content preview:", bodyString.substring(0, 200));

		const data = JSON.parse(bodyString);

		// data가 배열인지 객체인지 확인
		let prescriptions: Prescription[] = [];

		if (Array.isArray(data)) {
			// 배열 형태: [{ code: "...", ... }, ...]
			prescriptions = data;
		} else if (data.prescriptions && Array.isArray(data.prescriptions)) {
			// 객체 형태: { prescriptions: [...] }
			prescriptions = data.prescriptions;
		} else if (typeof data === "object") {
			// 객체 형태: { "CODE1": {...}, "CODE2": {...} }
			prescriptions = Object.values(data);
		}

		// code 필드가 있는지 확인하고 정렬
		const validPrescriptions = prescriptions.filter((p: any) => p && p.code);
		validPrescriptions.sort((a, b) => a.code.localeCompare(b.code));

		console.log("✅ Successfully fetched", validPrescriptions.length, "prescriptions");
		return validPrescriptions;
	} catch (error) {
		console.error("❌ Error fetching prescriptions list:", error);
		return [];
	}
}
