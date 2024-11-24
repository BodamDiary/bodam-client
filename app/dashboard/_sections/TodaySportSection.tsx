"use client"

import React from "react";
import TodaySportHeader from "../_components/TodaySportHeader";
import TodaySportCard from "../_components/TodaySportCard";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Content {
    title: string;
    url: string;
    tag: string;
    description: string;
    contentId: number;
    difficulty: number;
    thumbnail: string;
}

const TodaySportSection = () => {

    const [loading, setLoading] = useState<boolean|null>(true); // 로딩 상태
    const [error, setError] = useState<string|null>(null); // 에러 상태
    // TODO: 얘네는 그 뭐냐 API로 받는 걸로 바꿔야 함
    const [exercises, setExercises] = useState<Content[]>([]);

    useEffect(() => {

        // 콘텐츠 데이터 가져오기 함수
        async function getTodayContent() {
            try {
                // Next.js 프록시 API 호출
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/content/get-today-content`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`콘텐츠 불러오기에 실패했습니다: ${errorDetails}`);
                }

                const data = await response.json(); // JSON 데이터 파싱
                setExercises(data); // 데이터 상태 업데이트
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching today content:", error.message);
                    setError(error.message); // 에러 상태 업데이트
                }
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        }

        getTodayContent(); // useEffect 내에서 비동기 함수 호출
    }, []); // 빈 의존성 배열로 컴포넌트 첫 렌더링 시에만 실행


    if (loading) {
        return (
            <main>
                <div className="h-[365px] flex justify-center items-center">
                    <div className="text-2xl font-bold">
                        오늘의 추천 운동은?
                    </div>
                </div>
            </main>
        ) // 로딩 중
    }

    if (error) {
        return <p>Error: {error}</p>; // 에러 발생 시
    }

  return (
    <section className="w-full flex flex-col pt-10 pl-6 pb-9 gap-4">
      <TodaySportHeader />
      <div className="overflow-x-scroll pr-5">
        <div className="w-max flex flex-row justify-start items-center gap-x-4 ">
          {exercises.map((exercise) => (
            <Link
             href={{
               pathname: `/content-detail`,
               query: { contentId: exercise.contentId },
             }}
            >
                <TodaySportCard
                  key={exercise.contentId}
                  id={exercise.contentId}
                  title={exercise.tag}
                  image={exercise.thumbnail}
                  difficulty={exercise.difficulty}
                />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaySportSection;
