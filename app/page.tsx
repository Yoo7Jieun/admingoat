import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-white font-sans">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white sm:items-start">
				<h1 className="text-3xl font-bold mb-8 text-black">Goat Admin</h1>
				<div className="flex flex-col gap-4 w-full sm:flex-row sm:justify-center">
					<a href="/prescriptions" className="flex h-12 items-center justify-center rounded-full bg-black text-white px-6">
						처방전 보기
					</a>
					<a href="/responses" className="flex h-12 items-center justify-center rounded-full border border-black text-black px-6">
						응답 확인하기
					</a>
					<a href="/db-test" className="flex h-12 items-center justify-center rounded-full border border-blue-600 text-blue-600 px-6 hover:bg-blue-50">
						DB 테스트
					</a>
				</div>
			</main>
		</div>
	);
}
