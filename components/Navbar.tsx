"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
			});
			router.push("/login");
			router.refresh();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="text-xl font-bold text-black">
						Goat Admin
					</Link>
					<div className="flex space-x-4 items-center">
						<Link href="/prescriptions" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname?.startsWith("/prescriptions") ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>
							처방전 보기
						</Link>
						<Link href="/responses" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname?.startsWith("/responses") ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>
							응답 확인하기
						</Link>
						<button onClick={handleLogout} disabled={isLoggingOut} className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
							{isLoggingOut ? "로그아웃 중..." : "로그아웃"}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
