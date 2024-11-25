"use client"

import KakaoLoginButton from "@/app/_components/KakaoLoginButton";
import LoginButton from "@/app/_components/LoginButton";
import Image from "next/image";

export default function Home() {

  return(
      <main className="relative">
        <div className="mt-32 mb-16">
          <div className="flex flex-col items-end pr-6 mb-2">
              <p className="">우리 아이의 발달 기록을 담아보세요</p>
          </div>
          <div className="flex flex-col items-end w-full pr-6">
              <h1 className="font-bold text-2xl">세상에서 하나뿐인</h1>
              <h1 className="font-bold text-2xl">따뜻한 공간</h1>
          </div>
        </div>
        <div className="relative w-full flex flex-col justify-start">
            <Image
                src="/images/onboarding.png"
                alt="onboarding image"
                width={492}
                height={433}
            />
        </div>
          <div className="absolute flex flex-col -bottom-12 left-0 right-0 mx-8">
              <div className="mt-2">
                  <LoginButton />
              </div>
              <div className="mt-2">
                  <KakaoLoginButton />
              </div>

          </div>
      </main>
  );
}
