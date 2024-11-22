
import React from "react";
import Link from "next/link";

const TodaySportHeader = () => {
  return (
    <header className="flex items-center justify-between pr-6">
      <h1 className="text-base font-medium text-[#101010]">오늘의 운동</h1>
      <Link href="/contents">
        <button className="text-sm font-medium text-[#4C4DDC]">더보기</button>
      </Link>
    </header>
  );
};

export default TodaySportHeader;
