"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

interface DiaryData {
    diaryId: number;
    userId: number;
    studyContent: string;
    title: string;
    nickname: string;
    body: string;
    createdAt: string;
}

export default function UpdateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const diaryId = searchParams.get("diaryId");

    const [diaryData, setDiaryData] = useState<DiaryData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [unauthorized, setUnauthorized] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [studyContent, setStudyContent] = useState<string>("");
    const [body, setBody] = useState<string>("");

    // 데이터 로드
    useEffect(() => {
        if (!diaryId) {
            setLoading(false);
            setError("No diary ID provided.");
            return;
        }

        const fetchDiaryData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${apiUrl}/diary/get-diary/${diaryId}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.status === 401) {
                    setUnauthorized(true);
                    return;
                } else if (!res.ok) {
                    throw new Error("Diary not found");
                }

                const data = await res.json();
                setDiaryData(data);
            } catch (error) {
                if (error instanceof Error){
                    setError(error.message || "An error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDiaryData();
    }, [diaryId]);

    // diaryData 변경 시 상태 초기화
    useEffect(() => {
        if (diaryData) {
            setTitle(diaryData.title);
            setStudyContent(diaryData.studyContent);
            setBody(diaryData.body);
        }
    }, [diaryData]);

    const diaryUpdate = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${apiUrl}/diary/update-diary/${diaryId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    studyContent,
                    body,
                }),
            });

            if (res.status === 401) {
                alert("권한이 없습니다");
                throw new Error("Unauthorized");
            } else if (!res.ok) {
                alert("일기 수정이 정상적으로 이루어지지 않았습니다. 나중에 다시 시도해주세요.");
                throw new Error("Failed to update diary");
            } else {
                alert("일기가 수정되었습니다.");
                router.replace(`/diary-detail?diaryId=${diaryId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (unauthorized) {
        return <p>Unauthorized access.</p>;
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div>
                <div className="ml-1 mb-1 my-2.5 font-medium text-sm">제목</div>
                <div>
                    <input
                        type="text"
                        id="title"
                        className="h-[46px] rounded-xl focus:outline-none border placeholder-gray-400 border-main_200 px-5 py-2.5 text-sm text-opacity-50 w-full"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="ml-1 mb-1 my-2.5 font-medium text-sm">학습 내용</div>
                <div>
                    <input
                        type="text"
                        id="studyContent"
                        className="h-[46px] rounded-xl focus:outline-none placeholder-gray-400 border border-main_200 px-5 py-2.5 text-sm text-opacity-50 w-full"
                        placeholder="오늘 학습한 내용을 입력해주세요"
                        value={studyContent}
                        onChange={(e) => setStudyContent(e.target.value)}
                    />
                </div>
                <div className="ml-1 mb-1 my-2.5 font-medium text-sm">일기 내용</div>
                <div>
                    <textarea
                        id="large-input"
                        className="w-full h-64 p-4 text-sm rounded-xl border border-main_300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main_300"
                        placeholder="내용을 입력해주세요"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button
                    onClick={diaryUpdate}
                    className="fixed bottom-10 left-0 right-0 flex items-center justify-center mx-5 h-12 rounded-2xl bg-main_300 text-white"
                >
                    수정하기
                </button>
            </div>
        </>
    );
}