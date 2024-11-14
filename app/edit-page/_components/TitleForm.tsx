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

interface TitleFormProps {
  item: string | null; // item이 null일 수 있으므로 null 타입도 포함합니다.
}

const TitleForm: React.FC<TitleFormProps> = ({ item }) => {
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
        <span className="text-xl font-bold">{item || "수정 페이지"}</span>
        <button onClick={FinishButton}>
             <span className="text-blue-400 text-base font-bold">완료</span>
        </button>
    </>
    )
}

export default TitleForm;