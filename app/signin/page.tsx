import React from "react";
import SignInForm from "./_components/SignInForm";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage(){
    return(
        <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden overflow-y-hidden">
            <section className="mt-[120px] w-full py-10 px-5">
                <div className="w-full flex flex-col justify-start items-start gap-y-3">
                    <div className="w-full flex flex-row justify-start items-cetner px-2 mb-3">
                        <h3 className="text-xl font-bold tracking-tight text-black leading-5">
                            계정에 로그인하세요!
                        </h3>
                    </div>
                    <SignInForm />
                    <div className="w-full flex flex-col justify-center">
                        <Link
                            href="signup"
                            className="w-full flex justify-center"
                        >
                            <span className="font-bold text-sub">
                                계정이 없으신가요? {" "}
                                <span className="text-main_500 font-bold">회원가입하러 가기</span>
                            </span>

                        </Link>
                    </div>
                    <p className="flex w-full justify-center gap-4 text-placeholder font-bold">or</p>
                </div>
                <Link
                    href="/kakao"
                    className="mt-[100px] w-full flex justify-center">
                    <div className="relative w-[60px] h-[60px] ">
                        <Image src="/icons/icon-kakao-circle.png" alt="카카오톡 로그인" fill />
                    </div>



                </Link>

            </section>
        </main>
    );
}