"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MenuBar from "@/app/_components/MenuBar";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

interface DiaryData {
    diaryId: number;
    userId: number;
    studyContent: string;
    title: string;
    nickname: string;
    body: string;
    createdAt: string;
}

export default function Diary() {
    const [diaries, setDiaries] = useState<DiaryData[]>([]);
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDiaries() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/diary/get-all-diaries`);

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`일기 불러오기에 실패했습니다: ${errorDetails}`);
                }

                const data = await response.json();
                setDiaries(data);
            } catch (err) {
                console.error("Error fetching diaries:", err);
                setError("일기 데이터를 불러오는 중 오류가 발생했습니다.");
            }
        }

        fetchDiaries();
    }, []); // 빈 배열: 컴포넌트 첫 렌더링 시 한 번만 실행

    const filteredDiaries = diaries.filter((diary) =>
        diary.title.includes(search) || diary.studyContent.includes(search) || diary.body.includes(search)
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main>
            <div className="fixed top-0 pt-10 w-full bg-white">
                <div className="mx-4 mb-5 relative flex flex-col justify-start">
                    <div className="absolute flex flex-col left-0 mx-4 py-3.5">
                        <Image
                            src="/icons/icon-search.svg"
                            alt="search image"
                            width={17}
                            height={17}
                        />
                    </div>
                    <input
                        type="text"
                        id="search"
                        className="h-[46px] w-full rounded-3xl focus:outline-none bg-[#F8F9FE] pr-5 pl-10 py-2.5 text-base font-bold text-placeholder"
                        placeholder="검색"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-32 mx-6 mb-24">
                {filteredDiaries.length === 0 ? (
                    <p>일기가 없습니다.</p>
                ) : (
                    filteredDiaries.map((diary) => (
                        <div key={diary.diaryId} className="mb-10">
                            <Link
                                href={{
                                    pathname: "/diary-detail",
                                    query: { diaryId: diary.diaryId },
                                }}
                            >
                                <h3 className="text-lg font-semibold mb-2">{diary.title}</h3>
                                <p className="text-base text-gray-700 whitespace-pre-wrap">{diary.studyContent}</p>
                                <p className="text-base text-gray-700 whitespace-pre-wrap">{formatDate(diary.createdAt)}</p>
                            </Link>
                        </div>
                    ))
                )}
            </div>

            <MenuBar />
        </main>
    );
}
