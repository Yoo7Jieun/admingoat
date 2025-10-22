import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function PrescriptionsPage() {
	// Fetch all prescription codes from the database
	const prescriptions = await prisma.prescription.findMany({
		select: {
			code: true,
			name: true,
		},
		orderBy: {
			code: "asc",
		},
	});

	return (
		<div className="p-8 bg-white min-h-screen">
			<div className="mb-8">
				<Link href="/" className="text-blue-600 hover:underline">
					← 홈으로
				</Link>
			</div>
			<h1 className="text-3xl font-bold mb-8 text-black">처방전 보기</h1>
			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
				{prescriptions.map((prescription) => (
					<Link key={prescription.code} href={`/prescriptions/${prescription.code}`} className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors bg-white">
						<div className="text-lg font-bold text-black">{prescription.code}</div>
						{prescription.name && <div className="text-xs text-gray-600 mt-1 text-center">{prescription.name}</div>}
					</Link>
				))}
			</div>
		</div>
	);
}
