"use client"

import {useState} from "react";
import {useRouter} from "next/navigation"
import {toast} from "sonner";

// interface KakaoSignUpFormProps {
//   email: string | null; // item이 null일 수 있으므로 null 타입도 포함합니다.
// }

const KakaoSignUpForm = () => {
//     const email = signin 페이지에서 가져오기
    const [userName, setUserName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const router = useRouter();

    const handleLoginButton = async () => {
        try {
            if (userName == null || userName == "") {
                toast.error("이름 필수")
                throw new Error("이름 필수")
            }

            if (nickname == null || nickname == "") {
                toast.error("닉네임 필수")
                throw new Error("닉네임 필수")
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/regist-kakao`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    userName,
                    nickname,
                    address,
                }),
            });

            if (!response.ok) {
                toast.error("회원가입에 실패했습니다.");
                throw new Error("회원가입에 실패했습니다.");
            }

            toast.success("회원가입이 성공적으로 이뤄졌습니다!");
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <>

            <input
                type="text"
                id="userName"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="이름"
                value={userName}
                autoComplete="on"
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                id="nickname"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="text"
                id="address"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="집 주소(선택)"
                value={address}
                autoComplete="on"
                onChange={(e) => setAddress(e.target.value)}
            />

            <button
                onClick={() => handleLoginButton()}
                className="mt-[20px] h-[46px] w-full rounded-2xl bg-main_300 text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5">
                회원가입
            </button>
        </>
    );
}

export default KakaoSignUpForm;