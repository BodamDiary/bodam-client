"use client"

import {useState} from "react";
import {useRouter} from "next/navigation"
import {toast} from "sonner";

const SignInForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const handleLoginButton = async () => {
        try {

            if (email == null || email == "") {
                toast.error("이메일을 입력하세요")
                throw new Error("이름 필수")
            }

            if (password == null || password == "") {
                toast.error("비밀번호를 입력하세요")
                throw new Error("비밀번호 필수")
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/login-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                }),            });

            if (!response.ok) {
                toast.error("로그인에 실패했습니다.");
                throw new Error("로그인에 실패했습니다.");
            }

            toast.success("로그인이 성공적으로 이뤄졌습니다!");
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        } catch(error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <>
            <input
                type="text"
                id="email"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-placeholder text-opacity-50"
                >
                    <img
                        src={showPassword ? "/icons/icon-eye-open.svg" : "/icons/icon-eye-closed.svg"}
                        alt={showPassword ? "Hide password" : "Show password"}
                        className="w-4 h-4 opacity-50"
                    />
                </button>
            </div>
            <button
                onClick={() => handleLoginButton()}
                className="h-[46px] w-full rounded-2xl bg-main_300 text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5">
                로그인하기
            </button>
        </>
    );
}

export default SignInForm;