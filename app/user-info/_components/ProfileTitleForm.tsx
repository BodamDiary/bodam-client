"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

import BackButton from "@/app/_components/BackButton";

const MoreIcon = () => (
    <Image
        src="/icons/icon-more.svg"
        alt="more icon"
        width={20}
        height={20}
    />
);

const ProfileTitleForm = () => {
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const [isLogout, setIsLogout] = useState(false);
    const logout = () => setIsLogout(!isLogout);

    const [isDelete, setIsDelete] = useState(false);
    const deleteAccount = () => setIsDelete(!isDelete);

    const [isAnalyze, setIsAnalyze] = useState(false);
    const analyze = () => setIsAnalyze(!isAnalyze);

    const logoutExecute = async () => {
        try {

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/logout-user`, {
                method: "GET",
                credentials: 'include',
            });

            if (!response.ok) {
                toast.error("로그아웃 실패했습니다.");
                throw new Error("로그아웃에 실패했습니다.");
            }

            toast.success("로그아웃 되었습니다");
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch(error) {
            console.error('Logout error:', error);
        }
    };

    const deleteAccountExecute = async () => {
        try {

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/delete-user`, {
                method: "GET",
                credentials: 'include',
            });

            if (!response.ok) {
                toast.error("회원탈퇴에 실패했습니다.");
                throw new Error("회원탈퇴에 실패했습니다.");
            }

            toast.success("탈퇴 되었습니다");
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch(error) {
            console.error('Delete Account error:', error);
        }
    };

    // Close menu when clicking outside
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

    const handleAnalyze = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/analyze-diaries', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analysis');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // PDF 파일 다운로드
            const link = document.createElement("a");
            link.href = url;
            link.download = "analysis-result.pdf"; // 다운로드될 파일명
            link.click();

            // URL 객체 해제
            window.URL.revokeObjectURL(url);
            setIsAnalyze(false);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while performing the analysis.');
        }
    };

    return (
        <>
            <BackButton/>
            <span className="text-lg font-bold">보담 프로필 설정</span>
            <div className="relative" ref={menuRef}>
                <button onClick={toggleMenu}>
                    <MoreIcon />
                </button>

                {menuOpen && (
                    <div className="absolute top-8 right-0 w-32 bg-white shadow-lg border rounded-lg px-2 py-3 z-50">
                        <button onClick={analyze} className="text-left px-2 mb-1 hover:bg-gray-100">보담 분석하기</button>
                        <button onClick={logout} className="text-left px-2 mb-1 hover:bg-gray-100">로그아웃</button>
                        <button onClick={deleteAccount} className="text-left px-2 hover:bg-gray-100">회원 탈퇴</button>
                    </div>
                )}

                {isAnalyze && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-80 shadow-lg relative">
                            <h2 className="flex justify-center text-lg font-bold mb-4">보담이 분석</h2>
                            <p className="flex justify-center mb-4 text-gray-500">보담이 분석 PDF 파일을 생성하시겠어요?</p>
                            <div className="flex justify-around">
                                <button onClick={analyze} className="mt-4 px-4 py-1 w-32 h-10 bg-white border-2 border-main_600 text-main_600 rounded-xl">
                                    취소
                                </button>
                                <button onClick={handleAnalyze} className="mt-4 px-4 py-2 w-32 h-10 bg-main_600 text-white rounded-xl">
                                    파일 생성하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isLogout && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-80 shadow-lg relative">
                            <h2 className="flex justify-center text-lg font-bold mb-4">로그아웃</h2>
                            <p className="flex justify-center mb-4 text-gray-500">계정에서 로그아웃 하시겠어요?</p>
                            <div className="flex justify-around">
                                <button onClick={logout} className="mt-4 px-4 py-1 w-32 h-10 bg-white border-2 border-main_600 text-main_600 rounded-xl">
                                    취소
                                </button>
                                <button onClick={logoutExecute} className="mt-4 px-4 py-2 w-32 h-10 bg-main_600 text-white rounded-xl">
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
                            <h2 className="flex justify-center text-lg font-bold mb-4">회원탈퇴</h2>
                            <p className="flex justify-center mb-4">정말 계정을 삭제 하시겠어요?</p>
                            <div className="flex justify-around">
                                <button onClick={deleteAccount} className="mt-4 px-4 py-1 w-32 h-10 bg-white border-2 border-main_600 text-main_600 rounded-xl">
                                    취소
                                </button>
                                <button onClick={deleteAccountExecute} className="mt-4 px-4 py-2 w-32 h-10 bg-main_600 text-white rounded-xl">
                                   탈퇴하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileTitleForm;
