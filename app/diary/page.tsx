
import MenuBar from "@/app/_components/MenuBar";
import DiaryList from "./_components/DiaryList";
import ErrorPage from "@/app/_components/ErrorPage";

import {cookies} from "next/headers";

export default async function Diary() {

      const cookieStore = await cookies();
      const JSESSIONID = cookieStore.get('JSESSIONID');

      if (JSESSIONID == null) {
        return (
          <ErrorPage/>
        )
      }

    return (
        <main>
            <DiaryList/>

            <MenuBar />
        </main>
    );
}
