"use client"

import Image from "next/image";
import { useRouter} from 'next/navigation';
import { useState, useEffect } from "react";

import MenuBar from "@/app/_components/MenuBar";

interface Content {
    title: string;
    url: string;
    tag: string;
    description: string;
    contentId: number;
    difficulty: number;
}

const ContentDetail = function() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const BackIcon = () => {
        return (
            <Image
                src="/icons/icon-back.svg"
                alt="back icon"
                width={20}
                height={20}
            />
        )
    };

    const [content, setContent] = useState<Content|null>(null); // 콘텐츠 데이터 상태
    const [loading, setLoading] = useState<boolean|null>(true); // 로딩 상태
    const [error, setError] = useState<string|null>(null); // 에러 상태

    useEffect(() => {
        // 콘텐츠 데이터 가져오기 함수
        async function getContent() {
            try {
                // Next.js 프록시 API 호출
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/content/get-content/1`);

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`콘텐츠 불러오기에 실패했습니다: ${errorDetails}`);
                }

                const data = await response.json(); // JSON 데이터 파싱
                setContent(data); // 데이터 상태 업데이트
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching content:", error.message);
                    setError(error.message); // 에러 상태 업데이트
                }
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        }

        getContent(); // useEffect 내에서 비동기 함수 호출
    }, []); // 빈 의존성 배열로 컴포넌트 첫 렌더링 시에만 실행

    if (loading) {
        return <p>Loading...</p>; // 로딩 중
    }

    if (error) {
        return <p>Error: {error}</p>; // 에러 발생 시
    }

    const mainTitles = ["STEP 1: 함께 참여하기", "STEP 2: 안전하게 도와주기"];
    const body = ["아이 옆에서 먼저 시범을 보여주세요!\n즐거운 표정으로 함께 운동하며 동기부여를 주시면 더 효과적이에요\n작은 성공에도 적극적으로 칭찬하는 것 잊지 않으셨죠?",
        "처음에는 동작을 천천히 따라하도록 지도해주세요.\n필요시 손동작을 잡아주며 바른 자세로 운동할 수 있도록 지도해주세요\n아이가 힘들어하면 잠시 휴식을 가진 후 다시 시작하셔도 좋습니다!"]

    if (!content){
        return null;
    }
    return (

        <main>
            <div>
                <div className="fixed top-8 mx-4">
                    <button onClick={handleGoBack}>
                        <BackIcon />
                    </button>
                </div>
                <div className="fixed top-16 left-0 w-full bg-white z-10">
                    <iframe
                        width="375"
                        height="211"
                        src={content.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>

                    <div className="w-full bg-white px-6 py-2 border-t border-gray-300">
                        <div className="flex justify-between mb-1">
                            <h2 className="font-bold text-xl">{content.title}</h2>
                            <Image
                                src="/icons/icon-heart.svg"
                                alt="heart icon"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
                <div className="pt-[310px]">
                    <div className="mx-6 mt-4 mb-40">
                        <div className="text-base">{content.tag}</div>
                        <div className="text-sm text-gray-500 mb-5">{content.description}</div>
                        {mainTitles.map((title, index) => (
                            <div key={index} className="mb-10">
                                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                <p className="text-base text-gray-700 whitespace-pre-wrap">{body[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="fixed bottom-10 w-full">
                    <Image
                        src="/images/fadeout.svg"
                        alt="fadeout"
                        className="w-full"
                        width={375}
                        height={50}
                    />
                </div>
            </div>
            <MenuBar/>
        </main>
    )
}

export default ContentDetail;