"use client"

import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";

export default function WriteForm() {
    const router = useRouter();

    const [diaryRegister, setDiaryRegister] = useState(false);
    const register = () => setDiaryRegister(!diaryRegister);

    useEffect(() => {
        const diaryRegistration = async function() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${apiUrl}/diary/regist-diary`, {
                    method: "POST", // POST 요청
                    headers: {
                        "Content-Type": "application/json", // 요청 본문이 JSON임을 명시
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        title,
                        studyContent,
                        body
                    }), // 필요한 데이터 전달
                });
                if (!res.ok) {
                    alert("일기 등록이 정상적으로 이루어지지 않았습니다. 나중에 다시 시도해주세요.");
                    throw new Error("Failed to register diary.");
                } else {
                    alert("일기가 등록되었습니다.");
                    const response = await res.json();
                    router.replace(`/diary-detail?diaryId=${response}`); // 원하는 경로로 이동
                }
            } catch (error){
                router.refresh();
                throw error;
            }
        };

        if (diaryRegister) {
            diaryRegistration();
        }

    }, [diaryRegister]);

    const [title, setTitle] = useState<string>('');
    const [studyContent, setStudyContent] = useState<string>('');
    const [body, setBody] = useState<string>('');

    return (

        <>
            <div>
                제목
            </div>
            <div>
                <input
                    type="text"
                    id="title"
                    className="h-[46px] rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50 w-full"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                분야 / 분류
            </div>
            <div>
                <input
                    type="text"
                    id="studyContent"
                    className="h-[46px] rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50 w-full"
                    placeholder="분야/분류"
                    value={studyContent}
                    onChange={(e) => setStudyContent(e.target.value)}
                />
            </div>
            <div>
                내용
            </div>
            <div className="flex flex-col items-center p-5">
                <label htmlFor="large-input" className="mb-2 text-lg font-bold">
                    큰 입력 박스
                </label>
                <textarea
                    id="large-input"
                    className="w-full h-64 p-4 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-main_300"
                    placeholder="내용을 입력하세요..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button
                onClick={register}
                className="fixed bottom-10 left-0 right-0 flex items-center justify-center mx-5 h-12 rounded-2xl bg-main_300 text-white"
            >
                등록하기
            </button>
        </>
    )
}