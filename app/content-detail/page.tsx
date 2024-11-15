"use client"

import Image from "next/image";
import DOMPurify from 'dompurify';
import { useRouter} from 'next/navigation';

import MenuBar from "@/app/_components/MenuBar";


export default function contentDetail() {
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

    const mainTitles = ["STEP 1: 함께 참여하기", "STEP 2: 안전하게 도와주기"];
    const body = ["아이 옆에서 먼저 시범을 보여주세요!\n즐거운 표정으로 함께 운동하며 동기부여를 주시면 더 효과적이에요\n작은 성공에도 적극적으로 칭찬하는 것 잊지 않으셨죠?",
                    "처음에는 동작을 천천히 따라하도록 지도해주세요.\n필요시 손동작을 잡아주며 바른 자세로 운동할 수 있도록 지도해주세요\n아이가 힘들어하면 잠시 휴식을 가진 후 다시 시작하셔도 좋습니다!"]

    return (

        <main>
            <div className="fixed top-8 mx-4">
                <button onClick={handleGoBack}>
                    <BackIcon />
                </button>
            </div>
            <div className="fixed top-16 left-0 w-full flex justify-center bg-white z-10">
                <iframe
                    width="375"
                    height="211"
                    src="https://www.youtube.com/embed/LbQFq4HxRYA?si=ZlkWPX-1O3TSJ72l"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </div>
            <div className="pt-[284px]">
                <div className="m-6">
                    <div className="flex justify-between mb-1">
                        <h2 className="font-bold text-xl">발달장애인용 운동 프로그램</h2>
                        <Image
                            src="/icons/icon-heart.svg"
                            alt="heart icon"
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="text-base mb-6">#몸운동</div>
                    <div className="text-sm text-gray-500 mb-3">발달장애인 맞춤형으로 개발된 몸통운동을 배워보는 시간!
                                                   오늘은 몸통의 힘을 키워주는 몸통운동을 함께 해보겠습니다.
                                                   태권도 선수 출신 가수인 나태주가 알려주는 몸통운동을 즐겁게 따라해 보세요.</div>
                </div>
                <div className="mx-6 mt-8 mb-40">
                    {mainTitles.map((title, index) => (
                        <div key={index} className="mb-10">
                            <h3 className="text-lg font-semibold mb-2">{title}</h3>
                            <p className="text-base text-gray-700 whitespace-pre-wrap">{body[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <MenuBar/>
        </main>
    )
}