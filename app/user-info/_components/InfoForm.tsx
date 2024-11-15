"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

interface InfoFormProps {
  userId: int | null; // item이 null일 수 있으므로 null 타입도 포함합니다.
}

const InfoForm = async ({userId} : InfoFormProps) => {
  const router = useRouter();

  const goToEditPage = (item: string) => {
    router.push('/edit-page?item=' + item);
  };

  interface GoToEditPageProps {
    item: string;
  }

  const GoToEditPage = ({ item } : GoToEditPageProps) => (
    <button onClick={() => goToEditPage(item)}>
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

  const goToEditLevel = (item : string) => {
      router.push('/edit-page?item=' + item);
    };

  const GoToEditLevel = ({ item } : GoToEditPageProps) => (
      <button onClick={() => goToEditLevel(item)}>
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

  async function getBodam() {
      try {
          // Next.js 프록시 API 호출
          const response = await fetch(`/proxy?path=bodam/get-bodam/${userId}`);

          if (!response.ok) {
              const errorDetails = await response.text();
              throw new Error(`사용자 불러오기에 실패했습니다: ${errorDetails}`);
          }

          const bodam = await response.json(); // JSON 데이터 파싱
          return bodam;
      } catch (error) {
          console.error("Error fetching user through proxy:", error.message);
          throw error;
      }
  }

  const bodam = await getBodam();

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
              <GoToEditPage item="보담이 이름" />
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <div className="mt-3 text-xs pl-3">생년월일</div>
                <div className="font-semi-bold text-base pl-3">{formatDate(bodam.birthday)}</div>
              </div>
              <GoToEditPage item="생년월일" />
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <div className="mt-3 text-xs pl-3">성별</div>
                <div className="font-semi-bold text-base pl-3">{bodam.bodamGender}</div>
              </div>
              <GoToEditPage item="성별" />
            </div>
            <hr className="mt-1" />
          </div>

          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semi-bold text-base pl-3 mt-4 mb-3">의사소통 수준</span>
              <GoToEditLevel item="c"/>
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semi-bold text-base pl-3 mt-4 mb-3">인지능력 수준</span>
              <GoToEditLevel item="p"/>
            </div>
            <hr className="mt-1" />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semi-bold text-base pl-3 mt-4 mb-3">일상생활 수행능력</span>
              <GoToEditLevel item="d"/>
            </div>
            <hr className="mt-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoForm;
