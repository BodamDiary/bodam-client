import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const path = url.searchParams.get("path"); // 쿼리 파라미터로 경로 추출

    if (!path) {
        return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
    }

    try {
        const response = await fetch(`http://localhost:8080/${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        return NextResponse.json(data); // 클라이언트에 응답 전달
    } catch (error) {
        console.error("Proxy GET Error:", error);
        return NextResponse.json({ error: "GET 요청 처리 중 문제가 발생했습니다." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const url = new URL(req.url);
    const path = url.searchParams.get("path"); // 쿼리 파라미터로 경로 추출
    const body = await req.json();

    if (!path) {
        return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
    }

    try {
        const response = await fetch(`http://localhost:8080/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // 본문 전달
        });

        const data = await response.json();

        return NextResponse.json(data); // 클라이언트에 응답 전달
    } catch (error) {
        console.error("Proxy POST Error:", error);
        return NextResponse.json({ error: "POST 요청 처리 중 문제가 발생했습니다." }, { status: 500 });
    }
}
