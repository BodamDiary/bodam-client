
import React from "react";
import Image from "next/image";
import Link from "next/link";

import ProfileTitleForm from "./_components/ProfileTitleForm";
import InfoForm from "./_components/InfoForm";
import MenuBar from "@/app/_components/MenuBar";

const EditProfileIcon = () => (
  <Image
    src="/icons/icon-editProfile.svg"
    alt="edit profile icon"
    width={25}
    height={25}
  />
);

async function getUser() {
    try {
        // Next.js 프록시 API 호출
        const response = await fetch("http://localhost:8080/users/get-user/2");

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`사용자 불러오기에 실패했습니다: ${errorDetails}`);
        }

        const user = await response.json(); // JSON 데이터 파싱
        return user;
    } catch (error) {
        if (error instanceof Error){
            console.error("Error fetching user through proxy:", error.message);
            throw error;
        }
    }
}



export default async function Info() {

  const user = await getUser();

  return (
    <main className="relative">
      <div className="flex items-center justify-around mt-10">
        <ProfileTitleForm />
      </div>
      <div>
        <div className="flex justify-center mt-18 pt-8 pb-4">
          <div className="relative">
            <Image
              src="/images/profileImg.svg"
              alt="profile image"
              width={80}
              height={80}
            />
            <div className="absolute bottom-0 right-0">
              <Link href="/">
                <EditProfileIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center font-bold">{user.nickname}</div>
        <div className="flex justify-center text-sm text-slate-500">
          {user.email}
        </div>
      </div>
       <InfoForm userId={user.userId}/>
       <MenuBar/>
    </main>
  );
}
