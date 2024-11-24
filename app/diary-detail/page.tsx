"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import MenuBar from "@/app/_components/MenuBar";
import BackButton from "@/app/_components/BackButton";
import ErrorPage from "@/app/_components/ErrorPage";

interface DiaryData {
    diaryId: number;
    userId: number;
    studyContent: string;
    title: string;
    nickname: string;
    body: string;
    createdAt: string;
}

const MoreIcon = () => (
    <Image
        src="/icons/icon-more.svg"
        alt="more icon"
        width={20}
        height={20}
    />
);

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

export default function DiaryDetail() {
    const searchParams = useSearchParams();
    const diaryId = searchParams.get('diaryId');
    const router = useRouter();

    const [diaryData, setDiaryData] = useState<DiaryData|null>(null); // 일기 데이터를 저장
    const [loading, setLoading] = useState<boolean|null>(true); // 로딩 상태
    const [error, setError] = useState<string|null>(null); // 에러 상태
    const menuRef = useRef<HTMLDivElement>(null);

    const [isDelete, setIsDelete] = useState(false);
    const deleteDiary = () => setIsDelete(!isDelete);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const [diaryDeleted, setDiaryDeleted] = useState(false);
    const deleted = () => setDiaryDeleted(!diaryDeleted);

    const [unauthorized, setUnauthorized] = useState<boolean | null>(false);

    useEffect(() => {
        const diaryDeletion = async function() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${apiUrl}/diary/delete-diary/${diaryId}`, {
                    method: "POST", // POST 요청
                    headers: {
                        "Content-Type": "application/json", // 요청 본문이 JSON임을 명시
                    },
                    credentials: 'include',
                    body: JSON.stringify({ diaryId }), // 필요한 데이터 전달
                });
                if (!res.ok) {
                    alert("일기 삭제가 정상적으로 이루어지지 않았습니다. 나중에 다시 시도해주세요.");
                    throw new Error("Failed to delete diary.");
                } else {
                    alert("일기가 삭제되었습니다.");
                    router.replace("/diary"); // 원하는 경로로 이동
                }
            } catch {
                router.refresh();
                throw error;
            }
        };

        if (diaryDeleted) { // diaryDeleted가 true일 때만 실행
            diaryDeletion();
        }

    }, [diaryDeleted]);

    // 데이터 로드
    useEffect(() => {
        if (!diaryId) {
            setLoading(false);
            setError("No diary ID provided.");
            return;
        }

        const fetchDiaryData = async () => {

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${apiUrl}/diary/get-diary/${diaryId}`,{
                method: 'GET',
                credentials: 'include',
            });

            if (res.status == 401) {
                setUnauthorized(true);
            } else if (!res.ok) {
                setError("diary not found");
            }
            const data = await res.json();
            setDiaryData(data);

            setLoading(false);

        };

        fetchDiaryData();
    }, [diaryId]); // diaryId가 변경될 때만 실행

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function diaryUpdate() {
       router.push(`/diary-update?diaryId=${diaryId}`);
    }

    if (unauthorized) {
        return (
            <ErrorPage/>
        )
    }

    if (loading) {
        return;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main>
            {/* Back button and fixed section */}
            <div className="sticky top-5 z-10 bg-white p-4">
                <div className="flex justify-between">
                    <BackButton/>
                    <div className="relative" ref={menuRef}>
                        <button onClick={toggleMenu}>
                            <MoreIcon />
                        </button>

                        {menuOpen && (
                            <div className="absolute top-8 right-0 w-32 bg-white shadow-lg border rounded-lg px-2 py-3 z-50">
                                <button onClick={diaryUpdate} className="text-left px-2 mb-1 hover:bg-gray-100">일기 수정</button>
                                <button onClick={deleteDiary} className="text-left px-2 hover:bg-gray-100">일기 삭제</button>
                            </div>
                        )}

                        {isDelete && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
                                    <h2 className="flex justify-center text-lg font-bold mb-6">일기삭제</h2>
                                    <p className="flex justify-center mb-4">정말 일기를 삭제 하시겠어요?</p>
                                    <div className="flex justify-around">
                                        <button onClick={deleteDiary} className="mt-4 px-4 py-1 w-32 h-10 bg-white border-2 border-main_600 text-main_600 rounded-xl">
                                            취소
                                        </button>
                                        <button onClick={deleted} className="mt-4 px-4 py-2 w-32 h-10 bg-main_600 text-white rounded-xl">
                                           삭제하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-48 w-full flex items-center justify-center bg-gray-200 rounded-2xl">
                    이미지
                </div>
                {diaryData && (
                    <div className="mt-4 mx-2">
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-500">{diaryData.studyContent}</p>
                            <p className="text-sm text-gray-400">{formatDate(diaryData.createdAt)}</p>
                        </div>
                        <h2 className="font-bold text-xl">{diaryData.title}</h2>
                        <p className="text-sm text-gray-500">{diaryData.nickname}</p>
                    </div>
                )}
            </div>

            {/* Scrollable body section */}
            {diaryData && (
                <div className="flex-1 overflow-y-auto p-4 mx-2 mt-7 mb-24">
                    <p className="whitespace-pre-wrap">{diaryData.body}</p>
                </div>
            )}
            <MenuBar/>
        </main>
    );
}
