
import TodaySportSection from "./_sections/TodaySportSection";
import Calendar from "./_components/Calendar";
import MenuBar from "@/app/_components/MenuBar";
import {cookies} from "next/headers";

import ReturnToLoginPage from "./_components/ReturnToLoginPage";

export default async function MainPage() {

  const cookieStore = await cookies();
  const uToken = cookieStore.get('uToken');
  console.log(uToken);

  if (uToken == null) {
    return (
        <main>
            잘못된 접근입니다. 돌아가세요
            <ReturnToLoginPage/>
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-white gap-5">
      <div className="flex-1 flex flex-col w-full h-max overflow-y-auto gap-y-6">
        <TodaySportSection />
        <div className="border-t mx-6 border-[#d4d6dd]" />
        <Calendar />
      </div>
      <MenuBar />
    </main>
  );
}
