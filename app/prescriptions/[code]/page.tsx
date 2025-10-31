import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PrescriptionDetailPage({ params }: { params: Promise<{ code: string }> }) {
	const { code } = await params;

	const prescription = await prisma.PRESCRIPTION.findUnique({
		where: {
			code: code,
		},
	});

	if (!prescription) {
		notFound();
	}

	return (
		<div className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
			<div className="mb-8">
				<Link href="/prescriptions" className="text-blue-600 hover:underline">
					← 처방전 목록으로
				</Link>
			</div>

			<div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
				<div className="mb-6 pb-6 border-b">
					<h1 className="text-3xl font-bold mb-2 text-black">{prescription.name || prescription.code}</h1>
					<p className="text-gray-600">코드: {prescription.code}</p>
				</div>

				<div className="space-y-6">
					{prescription.dear && (
						<div>
							<h2 className="text-lg font-semibold mb-2 text-gray-700">Dear</h2>
							<p className="text-gray-800 whitespace-pre-wrap">{prescription.dear}</p>
						</div>
					)}

					{prescription.letter && (
						<div>
							<h2 className="text-lg font-semibold mb-2 text-gray-700">Letter</h2>
							<p className="text-gray-800 whitespace-pre-wrap">{prescription.letter}</p>
						</div>
					)}

					{prescription.concept && (
						<div>
							<h2 className="text-lg font-semibold mb-2 text-gray-700">Concept</h2>
							<p className="text-gray-800 whitespace-pre-wrap">{prescription.concept}</p>
						</div>
					)}

					{prescription.movie && (
						<div>
							<h2 className="text-lg font-semibold mb-2 text-gray-700">Movie</h2>
							<p className="text-gray-800 whitespace-pre-wrap">{prescription.movie}</p>
						</div>
					)}

					{/* Challenge Section */}
					{(prescription.challengeConcept || prescription.challengeKeyword || prescription.challengeActivity) && (
						<div className="bg-red-50 p-6 rounded-lg">
							<h2 className="text-xl font-bold mb-4 text-red-900">Challenge</h2>
							<div className="space-y-3">
								{prescription.challengeConcept && (
									<div>
										<h3 className="font-semibold text-red-800">Concept</h3>
										<p className="text-gray-800">{prescription.challengeConcept}</p>
									</div>
								)}
								{prescription.challengeKeyword && (
									<div>
										<h3 className="font-semibold text-red-800">Keyword</h3>
										<p className="text-gray-800">{prescription.challengeKeyword}</p>
									</div>
								)}
								{prescription.challengeActivity && (
									<div>
										<h3 className="font-semibold text-red-800">Activity</h3>
										<p className="text-gray-800">{prescription.challengeActivity}</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Maintain Section */}
					{(prescription.maintainConcept || prescription.maintainKeyword || prescription.maintainActivity) && (
						<div className="bg-blue-50 p-6 rounded-lg">
							<h2 className="text-xl font-bold mb-4 text-blue-900">Maintain</h2>
							<div className="space-y-3">
								{prescription.maintainConcept && (
									<div>
										<h3 className="font-semibold text-blue-800">Concept</h3>
										<p className="text-gray-800">{prescription.maintainConcept}</p>
									</div>
								)}
								{prescription.maintainKeyword && (
									<div>
										<h3 className="font-semibold text-blue-800">Keyword</h3>
										<p className="text-gray-800">{prescription.maintainKeyword}</p>
									</div>
								)}
								{prescription.maintainActivity && (
									<div>
										<h3 className="font-semibold text-blue-800">Activity</h3>
										<p className="text-gray-800">{prescription.maintainActivity}</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Reconcile Section */}
					{(prescription.reconcileConcept || prescription.reconcileKeyword || prescription.reconcileActivity) && (
						<div className="bg-green-50 p-6 rounded-lg">
							<h2 className="text-xl font-bold mb-4 text-green-900">Reconcile</h2>
							<div className="space-y-3">
								{prescription.reconcileConcept && (
									<div>
										<h3 className="font-semibold text-green-800">Concept</h3>
										<p className="text-gray-800">{prescription.reconcileConcept}</p>
									</div>
								)}
								{prescription.reconcileKeyword && (
									<div>
										<h3 className="font-semibold text-green-800">Keyword</h3>
										<p className="text-gray-800">{prescription.reconcileKeyword}</p>
									</div>
								)}
								{prescription.reconcileActivity && (
									<div>
										<h3 className="font-semibold text-green-800">Activity</h3>
										<p className="text-gray-800">{prescription.reconcileActivity}</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
