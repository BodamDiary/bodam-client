import React from "react";

import HeartIcon from "@/public/icons/icon-heart.svg";
import StarIcon from "@/public/icons/icon-star.svg";
import Image from "next/image";

interface TodaySportCardProps {
  id: number;
  title: string;
  image: string;
  likes?: number;
  difficulty: string;
  rating: number;
}

const TodaySportCard = ({
  id,
  title,
  image,
  likes,
  difficulty,
  rating,
}: TodaySportCardProps) => {
  return (
    <div key={id} className="w-[257px] h-[249px] rounded-xl bg-white">
      <div className="relative">
        <Image
          src={image}
          alt="YouTube Thumbnail"
          width={257} // 원하는 너비
          height={182} // 원하는 높이
        />
        {likes && (
          <div className="absolute right-3 top-3 rounded-full bg-white p-1.5 shadow">
            <HeartIcon width={20} height={20} />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between items-start px-3 py-3">
        <div className="flex flex-col gap-y-1.5">
          <h3 className="text-sm font-medium text-[#101010]">{title}</h3>
          <p className="text-xs text-[#939393]">난이도: {difficulty}</p>
        </div>
        <div className="flex flex-row justify-start items-center gap-x-2">
          <StarIcon width={20} height={20} />
          <span className="text-[#101010] font-bold text-xs">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default TodaySportCard;
