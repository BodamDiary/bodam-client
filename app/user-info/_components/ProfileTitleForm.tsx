"use client"

import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";

const BackIcon = () => {
    return (
        <Image
            src="/icons/icon-back.svg"
            alt="back icon"
            width={20}
            height={20}
          />
    )
};

const MoreIcon = () => {
    return (
        <Image
            src="/icons/icon-more.svg"
            alt="more icon"
            width={20}
            height={20}
        />
    )
};


const ProfileTitleForm = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
    <>
        <button onClick={handleGoBack}>
              <BackIcon />
        </button>
        <span className="text-lg font-bold">보담 프로필 설정</span>
        <Link href="#">
             <MoreIcon />
        </Link>
    </>
    )
}

export default ProfileTitleForm;