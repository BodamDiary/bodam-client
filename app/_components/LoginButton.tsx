'use client';

import Link from "next/link";


const LoginButton = () => {
    return (
        <div>
            <Link
                href="/kakao"
                className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-main bg-main_200 rounded-md hover:bg-[#FDD835] transition-colors"
            >
                <span>로그인</span>
            </Link>
        </div>
    );
};

export default LoginButton;