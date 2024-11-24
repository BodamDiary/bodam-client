
import ReturnToLoginPage from "./ReturnToLoginPage";

import {
  Ban,
} from "lucide-react";

export default function ErrorPage() {

    return (
        <main>
            <div className="mt-60 flex flex-col justify-center items-center">
                <div className="text-red-500">
                    <Ban className="h-20 w-20 mb-4"/>
                </div>
                <h2 className="text-xl">잘못된 접근입니다. 돌아가세요</h2>
                <ReturnToLoginPage/>
            </div>
        </main>
    )

}