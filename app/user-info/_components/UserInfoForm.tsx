"use client"

import { useState, useEffect } from "react";
import ProfileImageUpload from "@/app/_components/ProfileImageUpload";
import ErrorPage from "@/app/_components/ErrorPage";

interface User {
    userId: number;
    email: string;
    kakaoId: string;
    nickname: string;
    userName: string;
    address: string;
    phoneNumber: string;
    profileImage: string;
    agreeCondition: boolean;
    isOauth: boolean;
    createdAt: string;
}

export default function UserInfoForm() {

    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState<boolean|null>(true);
    const [error, setError] = useState<string|null>(null);
    const [unauthorized, setUnauthorized] = useState<boolean | null>(false);

    // 프로필 이미지 업데이트 핸들러
    const handleImageUpdate = (newImageUrl: string) => {
        if (user) {
            setUser({
                ...user,
                profileImage: newImageUrl
            });
        }
    };

    // 사용자 정보 가져오기
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

    if (unauthorized){
        return <ErrorPage />
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!user){
      return null;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center gap-1 mt-3">
                <ProfileImageUpload
                    profileImage={user.profileImage}
                    onImageUpdate={handleImageUpdate}
                />
                <h2 className="text-xl font-bold">{user.nickname}</h2>
                <p className="text-gray-600">{user.email}</p>
            </div>
        </div>
    );
}