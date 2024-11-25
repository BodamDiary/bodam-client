"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/app/_components/BackButton";
import MenuBar from "@/app/_components/MenuBar";

interface Content {
    title: string;
    url: string;
    tag: string;
    description: string;
    contentId: number;
    difficulty: number;
    thumbnail: string;
}

export default function Contents() {

    const [contents, setContents] = useState<Content[]|null>([]); // 콘텐츠 데이터 상태
    const [loading, setLoading] = useState<boolean|null>(true); // 로딩 상태
    const [error, setError] = useState<string|null>(null); // 에러 상태

    useEffect(() => {
        // 콘텐츠 데이터 가져오기 함수
        async function getContents() {
            try {
                // Next.js 프록시 API 호출
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/content/get-all-content`);

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`콘텐츠 불러오기에 실패했습니다: ${errorDetails}`);
                }

                const data = await response.json(); // JSON 데이터 파싱
                setContents(data); // 데이터 상태 업데이트
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching content:", error.message);
                    setError(error.message); // 에러 상태 업데이트
                }
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        }

        getContents(); // useEffect 내에서 비동기 함수 호출
    }, []); // 빈 의존성 배열로 컴포넌트 첫 렌더링 시에만 실행

    if (loading) {
        return <p>Loading...</p>; // 로딩 중
    }

    if (error) {
        return <p>Error: {error}</p>; // 에러 발생 시
    }

    if (contents == null) {
        return <p>no contents</p>;
    }

    return (
        <main>
            <div className="w-full fixed top-0 px-4 pb-3 pt-5 bg-white">
                <BackButton/>
            </div>
                <div className="mt-16 mx-4 mb-28">
                    {contents.map((content) => (
                        <div key={content.contentId} className="mt-5">
                            <Link
                                href={{
                                    pathname: `/content-detail`,
                                    query: { contentId: content.contentId },
                                }}
                            >
                            <div className="flex justify-around">
                                <Image
                                  src={content.thumbnail}
                                  alt="YouTube Thumbnail"
                                  width={130} // 원하는 너비
                                  height={80} // 원하는 높이
                                />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                                    <p className="text-base text-gray-700 whitespace-pre-wrap">{content.tag}</p>
                                    <p className="text-base text-gray-700 whitespace-pre-wrap">난이도: {content.difficulty}</p>
                                </div>
                            </div>
                            </Link>
                            <div className="mt-5 flex justify-center">
                                <hr className="w-5/6"/>
                            </div>
                        </div>
                    ))}
                </div>
            <MenuBar />
        </main>
    )
}