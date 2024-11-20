"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const BackIcon = () => {
    return (
        <Image
            src="/icons/icon-back.svg"
            alt="back icon"
            width={20}
            height={20}
        />
    );
};

export default function BackButton() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <button onClick={handleGoBack}>
            <BackIcon />
        </button>
    )
}