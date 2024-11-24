"use client"

import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import DiaryImageUpload from "@/app/write-diary/_component/DiaryImageUpload";
import {toast} from "sonner";

export default function WriteForm() {
    const router = useRouter();

    const [diaryRegister, setDiaryRegister] = useState<boolean>(false);
    const register = () => setDiaryRegister(!diaryRegister);

    const [title, setTitle] = useState<string>('');
    const [studyContent, setStudyContent] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    useEffect(() => {
        const diaryRegistration = async function() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const formData = new FormData();

                console.log('Image Files:', imageFiles);
                imageFiles.forEach(file => {
                    formData.append('diaryImages', file);
                });

                formData.append('diary', JSON.stringify({
                    title,
                    studyContent,
                    body
                }));

                // 요청 전에 FormData 내용 확인
                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                const res = await fetch(`${apiUrl}/diary/regist-diary`, {
                    method: "POST",
                    credentials: 'include',
                    body: formData
                });

                console.log("res ::" , res);

                console.log('Server Response Status:', res.status);


                if (!res.ok) {

                if (res.status === 401) {
                    toast.error("권한이 없습니다");
                }
                    throw new Error("unauthorized");
                }
                if (!res.ok) {
                    alert("일기 등록이 정상적으로 이루어지지 않았습니다. 나중에 다시 시도해주세요.");
                    throw new Error("Failed to register diary.");
                }

                toast.success("일기가 등록되었습니다.");

                const response = await res.json();
                setTimeout(() => {
                    router.push(`/diary-detail?diaryId=${response.diaryId}`); // 대시보드 페이지로 이동
                }, 1500);


            } catch (error){
                console.error("error:" + error);
                router.refresh();
                throw error;
            }
        };

        if (diaryRegister) {
            diaryRegistration();
        }

    }, [diaryRegister, title,  studyContent, body, imageFiles]);

    const handleImagesChange = (files: File[]) => {
        setImageFiles(files)
    }
    return (

        <>
            <div>
                <DiaryImageUpload onImageChange={handleImagesChange}/>
            </div>
            <div className="ml-1 mb-1 my-2.5 font-medium text-sm">
                제목
            </div>
            <div>
                <input
                    type="text"
                    id="title"
                    className="h-[46px] rounded-xl focus:outline-none border placeholder-gray-400 border-main_200 px-5 py-2.5 text-sm text-placeholder text-opacity-50 w-full"
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="ml-1 mb-1 my-2.5 font-medium text-sm">
                학습 내용
            </div>
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
            <div className="ml-1 mb-1 my-2.5 font-medium text-sm">
                일기 내용
            </div>
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
                onClick={register}
                className="fixed bottom-10 left-0 right-0 flex items-center justify-center mx-5 h-12 rounded-2xl bg-main_300 text-white"
            >
                등록하기
            </button>
        </>
    )
}