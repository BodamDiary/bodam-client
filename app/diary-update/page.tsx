
import UpdateForm from "./_component/UpdateForm";
import BackButton from "@/app/_components/BackButton";
import {cookies} from "next/headers";

import ErrorPage from "@/app/_components/ErrorPage";

export default async function UpdateDiary() {

  const cookieStore = await cookies();
  const JSESSIONID = cookieStore.get('JSESSIONID');

  if (JSESSIONID == null) {
    return (
      <ErrorPage/>
    )
  }

    return (
        <main>
            <div className="mt-10 mx-4 mb-4">
                <BackButton/>
            </div>
            <div className="mx-4">
                <UpdateForm />
            </div>

        </main>
    )
}