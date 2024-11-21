
import Link from "next/link";

import {
  CalendarIcon,
  FileTextIcon,
  HomeIcon,
  Plus,
  UserIcon,
} from "lucide-react";

export default function MenuBar() {

    return (
    <div className="fixed bottom-0 w-full bg-white flex justify-around items-center pt-4 pb-8 px-2">
        <Link
            href="/dashboard"
            className="flex flex-col items-center text-gray-500">
            <HomeIcon className="h-7 w-7" />
        </Link>

        <Link
            href="/dashboard"
            className="flex flex-col items-center text-gray-500">
            <CalendarIcon className="h-7 w-7" />
        </Link>

        <Link
            href="/write-diary"
            className="rounded-[14px] bg-[#006ffd] p-3 text-white shadow-lg">
            <Plus className="h-7 w-7" />
        </Link>

        <Link
            href="/diary"
            className="flex flex-col items-center text-gray-500">
            <FileTextIcon className="h-7 w-7" />
        </Link>

        <Link
            href="/user-info"
            className="flex flex-col items-center text-gray-500">
            <UserIcon className="h-7 w-7" />
        </Link>
    </div>

    )
}