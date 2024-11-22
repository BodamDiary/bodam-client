"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

interface Bodam {
    userId: number;
    bodamId: number;
    cognitiveAbility: number;
    performanceAbility: number;
    bodamName:string;
    bodamGender:string;
    birthday:string;
}

const InfoForm = () => {
  const router = useRouter();

  const goToEditPage = (item: string, id: string) => {
    router.push(`/edit-page?item=${item}&id=${id}`);
  };

  interface GoToEditPageProps {
    item: string;
    id: string;
  }

  const GoToEditPage = ({ item, id } : GoToEditPageProps) => (
    <button onClick={() => goToEditPage(item, id)}>
      <EditIcon />
    </button>
  );

  const EditIcon = () => (
    <Image
      src="/icons/icon-edit.svg"
      alt="edit icon"
      width={20}
      height={20}
    />
  );

  const goToEditLevel = (item : string, id: string) => {
      router.push(`/edit-page?item=${item}&id=${id}`);
    };

  const GoToEditLevel = ({ item, id } : GoToEditPageProps) => (
      <button onClick={() => goToEditLevel(item, id)}>
        <EditLevelIcon />
      </button>
    );

  const EditLevelIcon = () => (
    <Image
      src="/icons/icon-editLevel.svg"
      alt="edit level icon"
      width={15}
      height={15}
    />
  );

    const [bodam, setBodam] = useState<Bodam|null>(null); // 보담 데이터 상태
    const [loading, setLoading] = useState<boolean|null>(true); // 로딩 상태
    const [error, setError] = useState<string|null>(null); // 에러 상태
    const [notFound, setNotFound] = useState<boolean|null>(false);
    const [unauthorized, setUnauthorized] = useState<boolean|null>(false);

    useEffect(() => {
        // 보담 데이터 가져오기 함수
        async function getBodam() {
            try {
                // Next.js 프록시 API 호출
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/bodam/get-bodam`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status == '401') {
                    setUnauthorized(true);
                }
                if (response.status == '204') {
                    setNotFound(true);
                    throw new Error('등록된 보담이가 없습니다');
                }
                else if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`보담이 불러오기에 실패했습니다: ${errorDetails}`);
                }

                const data = await response.json(); // JSON 데이터 파싱
                setBodam(data); // 데이터 상태 업데이트
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching bodam data:", error.message);
                    setError(error.message); // 에러 상태 업데이트
                }

            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        }

        getBodam();
    }, []);


    if (unauthorized) {
        return;
    }
    if (loading) {
        return;
    }

    if (setNotFound) {
        return (
            <div className="flex justify-center my-4">
                <div className="w-5/6 h-[40px] bg-main_300 text-white rounded-2xl flex items-center justify-center">
                    <Link href="/bodam-signup">
                        보담이 등록하기
                    </Link>
                </div>
            </div>
        )
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

  if (!bodam){
      return null;
  }

  return (
    <>
      <div className="mt-10 pt-5">
        <div className="pl-4">
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <div className="mt-3 text-xs pl-3">보담이 이름</div>
                <div className="font-semi-bold text-base pl-3">{bodam.bodamName}</div>
              </div>
              <GoToEditPage item="보담이 이름" id="bodamName"/>
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <div className="mt-3 text-xs pl-3">생년월일</div>
                <div className="font-semi-bold text-base pl-3">{formatDate(bodam.birthday)}</div>
              </div>
              <GoToEditPage item="생년월일" id="birthday" />
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <div className="mt-3 text-xs pl-3">성별</div>
                <div className="font-semi-bold text-base pl-3">{bodam.bodamGender}</div>
              </div>
              <GoToEditPage item="성별" id="bodamGender"/>
            </div>
            <hr className="mt-1" />
          </div>

          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semi-bold text-base pl-3 mt-4 mb-3">인지능력 수준</span>
              <GoToEditLevel item="p" id="cognitiveAbility"/>
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semi-bold text-base pl-3 mt-4 mb-3">일상생활 수행능력</span>
              <GoToEditLevel item="d" id="performanceAbility"/>
            </div>
            <hr className="mt-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoForm;
