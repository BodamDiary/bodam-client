import Image from "next/image";

export default function Loading(){
    return (
        <div className="flex min-h-screen flex-col justify-center items-center select-none overflow-x-hidden bg-main_100">
            <Image
                src="/images/logo-bodam-gradient.png"
                alt="gradient logo"
                width={456}
                height={511}
                className="animate-blink"
            />
        </div>

    );
}
