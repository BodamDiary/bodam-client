"use client"

import {useState} from "react";
import {useRouter} from "next/navigation"
import {toast} from "sonner";

const SignUpForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
    const router = useRouter();

    const handleLoginButton = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            if (email == null || email == "") {
                toast.error("이메일 필수")
                throw new Error("이메일 필수")
            }

            if (password == null || password == "") {
                toast.error("비밀번호 필수")
                throw new Error("비밀번호 필수")
            }

            if (userName == null || userName == "") {
                toast.error("이름 필수")
                throw new Error("이름 필수")
            }

            if (nickName == null || nickName == "") {
                toast.error("닉네임 필수")
                throw new Error("닉네임 필수")
            }

            if (password !== passwordCheck) {
                toast.error("비밀번호가 동일하지 않습니다")
                throw new Error("패스워드 다름")
            }

            let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~?!@#$%^&*_-]).{8,16}$/

            if (!reg.test(password)) {
                toast.error("비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요")
                throw new Error("비밀번호 유효성 검사 실패")
            }

            const response = await fetch(`${apiUrl}/users/regist-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    userName,
                    nickName,
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
            <div className="relative w-full">
                <input
                    type={showPasswordCheck ? "text" : "password"}
                    id="passwordCheck"
                    className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                    placeholder="비밀번호 확인"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-placeholder text-opacity-50"
                >
                    <img
                        src={showPasswordCheck ? "/icons/icon-eye-open.svg" : "/icons/icon-eye-closed.svg"}
                        alt={showPasswordCheck ? "Hide password" : "Show password"}
                        className="w-4 h-4 opacity-50"
                    />
                </button>
            </div>
            <input
                type="text"
                id="userName"
                className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                placeholder="이름"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
            />

            <button
                onClick={() =>
                    handleLoginButton()
                }
                className="mt-[20px] h-[46px] w-full rounded-2xl bg-main_300
                hover:bg-main_400 transition-colors duration-200
                text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5">
                회원가입
            </button>
        </>
    );
}

export default SignUpForm;