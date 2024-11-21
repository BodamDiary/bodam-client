'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

// const KakaoLoginButton = () => {
//     const router = useRouter();
//
//     const handleKakaoLogin = async () => {
//         try {
//             const response = await fetch.get("${apiUrl}/kakao"), {
//                 withCredentials: true
//             });
//         }
//     }
// }
const KakaoIcon = () => {
    return (
        <Image
            src="/icons/icon-kakao.svg"
            alt="Kakao icon"
            width={16}
            height={16}
        />
    )
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const url = `${apiUrl}/kakao`

const KakaoLoginButton = () => {
    return (
        <div>
            <Link
                href={url}
                className="flex items-center justify-center font-bold w-full gap-2 px-4 py-3 text-[#191919] bg-[#FEE500] rounded-md hover:bg-[#FDD835] transition-colors"
            >
                <KakaoIcon/>
                <span>카카오로 1초만에 로그인</span>
            </Link>
        </div>
    );
};

export default KakaoLoginButton;