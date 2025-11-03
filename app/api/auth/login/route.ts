import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
	try {
		const { password } = await request.json();

		// 환경변수에서 비밀번호 가져오기
		const adminPassword = process.env.ADMIN_PASSWORD;

		if (!adminPassword) {
			return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
		}

		// 비밀번호 확인
		if (password === adminPassword) {
			// 세션 쿠키 생성 (간단한 토큰)
			const sessionToken = Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64");

			const cookieStore = await cookies();
			cookieStore.set("admin-session", sessionToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 7, // 7일
			});

			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
		}
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ error: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 });
	}
}
