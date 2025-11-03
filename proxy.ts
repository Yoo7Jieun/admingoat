import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// 로그인 페이지와 API 엔드포인트는 인증 없이 접근 가능
	if (pathname === "/login" || pathname.startsWith("/api/auth/login")) {
		return NextResponse.next();
	}

	// 세션 쿠키 확인
	const session = request.cookies.get("admin-session");

	// 인증되지 않은 경우 로그인 페이지로 리다이렉트
	if (!session) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	// 인증된 경우 정상 진행
	return NextResponse.next();
}

// 프록시를 적용할 경로 설정
export const config = {
	matcher: [
		/*
		 * 다음을 제외한 모든 경로에 적용:
		 * - _next/static (정적 파일)
		 * - _next/image (이미지 최적화)
		 * - favicon.ico (파비콘)
		 * - public 폴더의 파일들
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
