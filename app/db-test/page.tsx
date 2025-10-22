"use client";

import { useState } from "react";
import Link from "next/link";

const QUESTIONS = ["p1", "p2", "e1", "e2", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "m1", "m2", "a1", "a2"];

export default function DBTestPage() {
	const [userData, setUserData] = useState({
		name: "",
		code: "",
		comment: "",
	});

	const [answers, setAnswers] = useState<{ [key: string]: string }>(
		QUESTIONS.reduce((acc, q) => {
			acc[q] = "";
			return acc;
		}, {} as { [key: string]: string })
	);

	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const updateAnswer = (question: string, value: string) => {
		setAnswers({ ...answers, [question]: value });
	};

	const handleUserSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const response = await fetch("/api/user", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...userData,
					answers: answers,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setMessage("✅ User 데이터 저장 성공!");
				setUserData({
					name: "",
					code: "",
					comment: "",
				});
				setAnswers(
					QUESTIONS.reduce((acc, q) => {
						acc[q] = "";
						return acc;
					}, {} as { [key: string]: string })
				);
			} else {
				setMessage(`❌ 오류: ${result.error || "저장 실패"}`);
			}
		} catch (error) {
			setMessage(`❌ 오류: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen p-8 bg-gray-50">
			<div className="max-w-2xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">User 데이터 입력 테스트</h1>
					<Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
						홈으로
					</Link>
				</div>

				{message && <div className={`p-4 mb-6 rounded ${message.startsWith("✅") ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>{message}</div>}

				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">User 데이터 입력</h2>
					<p className="text-sm text-gray-900 mb-4">ID는 자동으로 생성됩니다.</p>
					<form onSubmit={handleUserSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Name</label>
								<input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900" placeholder="사용자 이름" />
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Code</label>
								<input type="text" value={userData.code} onChange={(e) => setUserData({ ...userData, code: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900" placeholder="처방전 코드" />
							</div>
							<div className="col-span-1 md:col-span-2">
								<label className="block text-sm font-semibold text-gray-900 mb-1">Comment</label>
								<textarea value={userData.comment} onChange={(e) => setUserData({ ...userData, comment: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900" placeholder="코멘트" rows={3} />
							</div>
						</div>

						<div className="border-t pt-4 mt-4">
							<h3 className="text-lg font-semibold text-gray-900 mb-3">Answers (문항별 입력)</h3>
							<div className="space-y-3">
								{QUESTIONS.map((question) => (
									<div key={question} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
										<div className="md:col-span-2">
											<label className="block text-sm font-semibold text-gray-900">{question}</label>
										</div>
										<div className="md:col-span-10">
											<input type="text" value={answers[question]} onChange={(e) => updateAnswer(question, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900" placeholder={`${question}에 대한 답변`} />
										</div>
									</div>
								))}
							</div>
							<p className="text-xs text-gray-700 mt-2">15개의 정해진 문항에 대한 답변을 입력하세요. 자동으로 JSON 형식으로 변환됩니다.</p>
						</div>

						<button type="submit" disabled={loading} className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400">
							{loading ? "저장 중..." : "User 저장"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
