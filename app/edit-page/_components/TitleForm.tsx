"use client"

import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';

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



const TitleForm = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const item = searchParams.get('item'); // Get the 'item' query parameter


    const handleGoBack = () => {
        router.back();
    };

    const FinishButton = () => {
        router.back();
    };

    return (
    <>
        <button onClick={handleGoBack}>
              <BackIcon />
        </button>
        <span className="text-xl font-bold">{item}</span>
        <button onClick={FinishButton}>
             <span className="text-blue-400 text-base font-bold">완료</span>
        </button>
    </>
    )
}

export default TitleForm;