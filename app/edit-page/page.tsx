"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from "next/image";

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

const EditPage = () => {
  const searchParams = useSearchParams();
  const item = searchParams.get('item'); // Get the 'item' query parameter
  const id = searchParams.get('id');

  const [name, setName] = useState<string>('');

  const router = useRouter();

  const handleGoBack = () => {
      router.back();
  };


  const finishButton = () => {
      if ((id === 'bodamName' && item === '보담이 이름') || (id === 'birthday' && item === '생년월일') || (id === 'bodamGender' && item === '성별')) {
         alert(`${item} 변경`);
      }
      else {
        alert("변경 실패");
      }
      router.back();
  };



  return (
    <main>
    <div className="flex items-center justify-around mt-10 mb-10">
        <button onClick={handleGoBack}>
              <BackIcon />
        </button>
        <span className="text-xl font-bold">{item || "수정 페이지"}</span>
        <button onClick={finishButton}>
             <span className="text-blue-400 text-base font-bold">완료</span>
        </button>
    </div>
    <div>
      <hr className="mb-2 w-full"/>
      <div className="ml-5 mr-5">
      <p className="ml-2 text-gray-400 text-sm">{item}</p>
      <input
        type="text"
        id="name"
        className="h-[35px] w-full rounded-2xl focus:outline-none border text-gray-900 text-lg border-none px-2 py-2.5 text-placeholder"
        placeholder={item || ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <hr/>
    </div>
    </main>
  );
}

export default EditPage;
