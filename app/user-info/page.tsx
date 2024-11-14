
import React from "react";
import Image from "next/image";
import Link from "next/link";

import ProfileTitleForm from "./_components/ProfileTitleForm";
import InfoForm from "./_components/InfoForm";

const EditProfileIcon = () => (
  <Image
    src="/icons/icon-editProfile.svg"
    alt="edit profile icon"
    width={25}
    height={25}
  />
);

export default function Info() {

  return (
    <main className="relative">
      <div className="flex items-center justify-around mt-10">
        <ProfileTitleForm/>
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
        <div className="flex justify-center font-bold">보담맘</div>
        <div className="flex justify-center text-sm text-slate-500">
          dahee.pk@gmail.com
        </div>
      </div>
       <InfoForm/>
    </main>
  );
}
