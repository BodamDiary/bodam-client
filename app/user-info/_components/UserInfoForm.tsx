"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ErrorPage from "@/app/_components/ErrorPage";

interface User {
    userId: number;
    email: string;
    kakaoId: string;
    nickname: string;
    userName: string;
    address: string;
    phoneNumber: string;
    agreeCondition: boolean;
    isOauth: boolean;
    createdAt: string;
}

const EditProfileIcon = () => (
  <Image
    src="/icons/icon-editProfile.svg"
    alt="edit profile icon"
    width={25}
    height={25}
  />
);

export default function UserInfoForm() {

    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState<boolean|null>(true);
    const [error, setError] = useState<string|null>(null);
    const [unauthorized, setUnauthorized] = useState<boolean | null>(false);

    useEffect(() => {
        // 보담 데이터 가져오기 함수
        async function getUser() {
            try {
                // Next.js 프록시 API 호출
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/users/get-user`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status == 401) {
                    setUnauthorized(true);
                    throw new Error("unauthorized");
                }
                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`사용자 불러오기에 실패했습니다: ${errorDetails}`);
                }

                const data = await response.json(); // JSON 데이터 파싱
                setUser(data); // 데이터 상태 업데이트
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching user data:", error.message);
                    setError(error.message); // 에러 상태 업데이트
                }

            } finally {
                setLoading(false); // 로딩 상태 종료
            }

        }

        getUser();
    }, []); // userId가 변경될 때마다 실행

        if (unauthorized) {
            return <ErrorPage/>
        }

        if (loading) {
            return
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

      if (!user){
          return null;
      }

    return (
        <>
            <div className="flex justify-center mt-18 pt-8 pb-4">
              <div className="relative">
                <Image
                  src="/images/profileImg.svg"
                  alt="profile image"
                  width={80}
                  height={80}
                />
                <div className="absolute bottom-0 right-0">
                  <Link href="/">
                    <EditProfileIcon />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center font-bold">{user.nickname}</div>
            <div className="flex justify-center text-sm text-slate-500">
              {user.email}
            </div>
        </>
    )
}