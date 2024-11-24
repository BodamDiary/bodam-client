export const dynamic = 'force-dynamic';

import React from "react";
import {cookies} from "next/headers";

import ProfileTitleForm from "./_components/ProfileTitleForm";
import InfoForm from "./_components/InfoForm";
import UserInfoForm from "./_components/UserInfoForm";
import MenuBar from "@/app/_components/MenuBar";
import ErrorPage from "@/app/_components/ErrorPage";

export default async function Info() {

  const cookieStore = await cookies();
  const JSESSIONID = cookieStore.get('JSESSIONID');
  const id=10032

  if (JSESSIONID == null) {
    return (
      <ErrorPage/>
    )
  }

  return (
    <main className="relative">
      <div className="flex items-center justify-around mt-10">
        <ProfileTitleForm />
      </div>
      <div>
        <UserInfoForm/>
      </div>
       <InfoForm userId={id} />
       <MenuBar/>
    </main>
  );
}
