'use client';

import { useState, ChangeEvent } from 'react';
import Image from "next/image";
import { toast } from "sonner";

interface ProfileImageUploadProps {
    profileImage?: string;
    onImageUpdate: (newImageUrl: string) => void;
}

const ProfileImageUpload = ({ profileImage, onImageUpdate }: ProfileImageUploadProps) => {
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('이미지 파일만 선택해주세요.');
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPreviewUrl(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('파일을 선택해주세요.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        try {
            const loadingToastId = toast.loading('이미지 업로드 중...');
            const prodUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${prodUrl}/users/update-user/profile-image/upload`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || '업로드에 실패했습니다.');
            }

            if (result.imageUrl) {
                onImageUpdate(result.imageUrl);
                setPreviewUrl(''); // 미리보기 초기화
                setSelectedFile(null); // 선택된 파일 초기화
                toast.success('프로필 이미지가 업데이트되었습니다.', {
                    id: loadingToastId,
                });
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '예기치 않은 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-20 h-20">
            <div className="w-full h-full overflow-hidden rounded-[2rem]">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                    />
                ) : profileImage ? (
                    <img
                        src={profileImage}
                        alt="Current profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Image
                        src="/images/profileImg.svg"
                        alt="Default profile"
                        width={80}
                        height={80}
                    />
                )}
            </div>
            <div className="absolute bottom-0 right-0">
                {previewUrl ? (
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-white rounded-full p-0.5 shadow-md hover:bg-gray-50 transition-colors"
                    >
                        <Image
                            src="/icons/icon-greencheck.svg"
                            alt="confirm"
                            width={25}
                            height={25}
                        />
                    </button>
                ) : (
                    <div className="cursor-pointer bg-white rounded-full p-0.5 shadow-md hover:bg-gray-50 transition-colors">
                        <label>
                            <Image
                                src="/icons/icon-editProfile.svg"
                                alt="edit"
                                width={25}
                                height={25}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileImageUpload;