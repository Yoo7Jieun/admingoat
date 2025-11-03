import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// API 라우트는 동적으로 처리 (빌드 시 실행 안 함)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const user = await prisma.result.create({
			data: {
				nickname: body.nickname || null,
				code: body.code || null,
				comment: body.comment || null,
				answers: body.answers || {},
				created_at: new Date(),
				updated_at: new Date(),
			},
		});

		return NextResponse.json({ success: true, data: user }, { status: 201 });
	} catch (error: any) {
		console.error("Error creating user:", error);
		return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 });
	}
}
