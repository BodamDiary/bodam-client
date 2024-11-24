"use client"

import { useState, useEffect } from "react";
import ProfileImageUpload from "@/app/_components/ProfileImageUpload";
import { toast } from "sonner";

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
    createdAt: Date;
}

export default function UserInfoForm() {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

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
        const fetchUserData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/users/get-user`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('사용자 정보를 불러올 수 없습니다.');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : '오류가 발생했습니다.';
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error || !user) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
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