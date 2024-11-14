"use client"

import {useState} from "react";
import {useRouter} from "next/navigation"
import {toast} from "sonner";
import {setLoginUser} from "@/app/_utils/loginUserInfo";

interface KakaoSignUpFormProps {
  email: string | null; // item이 null일 수 있으므로 null 타입도 포함합니다.
}

const KakaoSignUpForm: React.FC<TitleFormProps> = ({ email }) => {
//     const email = signin 페이지에서 가져오기
    const [name, setName] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const router = useRouter();
    console.log(email);

    const handleLoginButton = async () => {
        try {
            const response = await fetch("http://localhost:8080/users/register-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    nickName,
                    address,
                }),
            });

            if (!response.ok) {
                throw new Error("회원가입에 실패했습니다.");
            }

            const userData = await response.json();
            setLoginUser(userData);

            toast.success("회원가입이 성공적으로 이뤄졌습니다!");
            setTimeout(() => {
                router.push("/create-group");
            }, 1500);
        } catch {
            toast.error("회원가입에 실패했습니다.");
        }
    };

    return (
        <>

            <input
                id="email"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="이메일"
                value={email || ""}
                readOnly
            />
            <input
                type="text"
                id="name"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="이름"
                value={name}
                autoComplete="on"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                id="nickName"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="닉네임"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
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