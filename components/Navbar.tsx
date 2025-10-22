"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="text-xl font-bold text-black">
						Goat Admin
					</Link>
					<div className="flex space-x-4">
						<Link href="/prescriptions" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname?.startsWith("/prescriptions") ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>
							처방전 보기
						</Link>
						<Link href="/responses" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname?.startsWith("/responses") ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>
							응답 확인하기
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
