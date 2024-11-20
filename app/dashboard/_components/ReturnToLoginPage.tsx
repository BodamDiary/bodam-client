"use client"

import { useRouter } from "next/navigation"

export default function ReturnToLoginPage() {
    const router = useRouter();

    const handleLoginButton = function() {
        router.replace("/");
    }

    return (
        <>
            <button
                onClick={() => handleLoginButton()}
                className="mt-[20px] h-[46px] rounded-2xl bg-main_300 text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5">
                로그인 페이지로 돌아가기
            </button>
        </>
    )
}