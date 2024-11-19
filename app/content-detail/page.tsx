"use client"

import Image from "next/image";
import { useRouter} from 'next/navigation';

import MenuBar from "@/app/_components/MenuBar";


interface Content {
    title: string;
    url: string;
    tag: string;
    description: string;
    contentId: number;
    difficulty: number;
}
let content: Content | null = null;

const ContentDetail = async function() {
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

    async function getContent() : Promise<Content> {
        try {
            // Next.js 프록시 API 호출
            const response = await fetch("http://localhost:8080/content/get-content/1");
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`콘텐츠 불러오기에 실패했습니다: ${errorDetails}`);
            }

            const data = await response.json(); // JSON 데이터 파싱
            return data as Content;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching user through proxy:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            throw error;
        }
    }

    if (content == null){
        content = await getContent();
    }

    const mainTitles = ["STEP 1: 함께 참여하기", "STEP 2: 안전하게 도와주기"];
    const body = ["아이 옆에서 먼저 시범을 보여주세요!\n즐거운 표정으로 함께 운동하며 동기부여를 주시면 더 효과적이에요\n작은 성공에도 적극적으로 칭찬하는 것 잊지 않으셨죠?",
                    "처음에는 동작을 천천히 따라하도록 지도해주세요.\n필요시 손동작을 잡아주며 바른 자세로 운동할 수 있도록 지도해주세요\n아이가 힘들어하면 잠시 휴식을 가진 후 다시 시작하셔도 좋습니다!"]

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