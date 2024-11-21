
import TodaySportSection from "./_sections/TodaySportSection";
import Calendar from "./_components/Calendar";
import MenuBar from "@/app/_components/MenuBar";

import ErrorPage from "@/app/_components/ErrorPage";

export default async function MainPage() {

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
