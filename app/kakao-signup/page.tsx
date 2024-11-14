
import React, { useEffect, useState } from "react";
import KakaoSignUpForm from "./_components/KakaoSignUpForm";
import Link from "next/link";
import Image from "next/image";
import { cookies } from 'next/headers';

export default function SignUpPage(){

    console.log(cookies());
    const email = cookies().get('email')?.value;
    console.log(email);

    return(
        <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden overflow-y-hidden">
            <section className="mt-[120px] w-full py-2 px-5">
                <div className="w-full flex flex-col justify-start items-start gap-y-2">
                    <div className="w-full flex flex-row justify-start items-cetner px-2 mb-6">
                        <h3 className="text-xl font-bold tracking-tight text-black leading-5">
                            보호자분의 계정을 생성해볼까요?
                        </h3>
                    </div>
                    <KakaoSignUpForm email={email}/>
                </div>
                <p className="flex mt-[35px] w-full justify-center gap-2 text-placeholder font-bold">or</p>
                <Link
                    href="http://localhost:8080/kakao"
                    className="mt-[35px] w-full flex justify-center">
                    <div className="relative w-[60px] h-[60px] ">
                        <Image src="/icons/icon-kakao-circle.png" alt="카카오톡 로그인" fill />
                    </div>
                </Link>
                <div className="mt-[35px] w-full flex flex-col justify-center">
                    <Link
                        href="signup"
                        className="w-full flex justify-center">
                        <span className="text-sm font-medium text-gray-400">
                            이미 계정이 있으신가요? {" "}
                            <span className="text-main_500 font-bold">로그인하러 가기</span>
                        </span>
                    </Link>
                </div>

            </section>
        </main>
    );
}