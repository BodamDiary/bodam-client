
import WriteForm from "./_component/WriteForm";
import BackButton from "@/app/_components/BackButton";

export default function WriteDiary() {


    return (
        <main>
            <div className="mt-10 mx-4 mb-4">
                <BackButton/>
            </div>
            <div className="mx-4">
                <WriteForm />
            </div>

        </main>
    )
}