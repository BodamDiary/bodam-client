"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const BackIcon = () => (
    <Image
        src="/icons/icon-back.svg"
        alt="back icon"
        width={20}
        height={20}
    />
);

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
    const menuRef = useRef(null);

    const handleGoBack = () => {
        router.back();
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const [isLogout, setIsLogout] = useState(false);
    const logout = () => setIsLogout(!isLogout);

    const [isDelete, setIsDelete] = useState(false);
    const deleteAccount = () => setIsDelete(!isDelete);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <button onClick={handleGoBack}>
                <BackIcon />
            </button>
            <span className="text-lg font-bold">보담 프로필 설정</span>
            <div className="relative" ref={menuRef}>
                <button onClick={toggleMenu}>
                    <MoreIcon />
                </button>

                {menuOpen && (
                    <div className="absolute top-8 right-0 w-32 bg-white shadow-lg border rounded-lg p-2 z-50">
                        <button onClick={logout} className="text-left px-2 hover:bg-gray-100">로그아웃</button>
                        <button onClick={deleteAccount} className="text-left px-2 hover:bg-gray-100">회원 탈퇴</button>
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
                                <button onClick={logout} className="mt-4 px-4 py-2 w-32 h-10 bg-main_600 text-white rounded-xl">
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
                                <button onClick={deleteAccount} className="mt-4 px-4 py-2 w-32 h-10 bg-main_600 text-white rounded-xl">
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
