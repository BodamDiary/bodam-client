"use client";

import {ChevronRight, ImageIcon, Check} from "lucide-react"
import {useState} from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'

type FormData = {
    name: string
    birth: string
    gender: 'male' | 'female' | null
    cognitive_level: number
    cognitive_options: string[]
    performance_level: number
    performance_options: string[]
}

export default function BodamSignupPage(){
    const router = useRouter();

    // Form state
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        birth: '',
        gender: null,
        cognitive_level: 0,
        cognitive_options: [],
        performance_level: 0,
        performance_options: []
    })

    const CognitiveOptions = [
        "한글 읽기가 가능함",
        "한글 쓰기가 가능함",
        "숫자에 대한 인지를 하고 있음",
        "날짜, 요일에 대한 인지를 하고 있음",
        "위치, 장소에 대한 인지를 하고 있음",
        "주위 사람들에 대한 인지를 하고 있음",
        "상황에 대한 인지를 하고 있음"
    ]
    const PerformanceOptions = [
        "옷 갈아입기",
        "세수나 양치, 머리 감기",
        "목욕하기",
        "차려놓으면 식사하기",
        "걷기",
        "배변 및 배뇨"
    ]

    // handle form submission
    const handleNext = () => {
        if (step < 3) {
            setStep(step+1)
        } else {
          console.log('Form submitted:', formData)

          registBodam();
        }
    }


    const registBodam = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/bodam/regist-bodam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    bodamName: formData.name,
                    bodamGender: formData.gender,
                    birth: formData.birth,
                    cognitiveAbility: formData.cognitive_level,
                    performanceAbility: formData.performance_level
                }),
            })

            if (response.status === 401) {
                alert('권한이 없습니다.');
                router.push('/');
            } else if (!response.ok) {
                alert('보담이 등록 실패');
                const errorDetails = await response.text();
                throw new Error(`보담이 등록 실패: ${errorDetails}`);
            } else {
                router.replace('/user-info');
            }

        } catch(error) {
            if (error instanceof Error)  {
                console.log(error.message)
            }
        }
    }

    // Render different steps
    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <main className="flex w-full flex-col bg-white">
                        <div
                            className="relative top-0 left-0 w-full h-[520px] bg-main_700 flex flex-col items-center justify-center">

                            {/* main contents */}
                            <div className="absolute ">
                                <ImageIcon className="w-8 h-8 text-main_200"/>
                            </div>

                        </div>
                        {/* header */}
                        <header className="absolute right-0 flex justify-end p-4 mt-16">
                            <button
                                className="flex text-md font-bold text-gray-900 end-0"
                            >
                                다음에 하기 <ChevronRight className="w-5 h-5 ml-1 mt-0.5"/>
                            </button>
                        </header>


                        {/* text contents */}
                        <div className="">
                            <p className="text-[24px] flex justify-center font-bold mt-10 tracking-wider">
                                보담이의 계정을 생성해보아요!
                            </p>
                            <p className="m-8 text-sub mt-6 text-sm">
                                보담이가 여러 명일 경우, 프로필 설정에서 추가해주세요.
                                <br/>
                                해당하는 항복이 없을 경우, 기타에 입력해주시면
                                <br/>
                                최대한 빠르게 반영이 가능합니다.
                                <br/>
                            </p>
                        </div>
                    </main>
                )
            case 1:
                return (
                    <main
                        className="flex flex-col items-center select-none overflow-x-hidden overflow-y-hidden">
                        <section className="mt-[120px] w-full px-5">
                            <div className="w-full flex flex-col justify-start items-start gap-y-3">
                                <div className="w-full flex flex-row justify-start items-cetner px-2 mb-3">
                                    <h3 className="text-xl font-bold tracking-tight text-black leading-5">
                                        보담이에 대해 알려주세요!
                                    </h3>
                                </div>
                                <div className="w-full space-y-4 mt-8">
                                    <input
                                        type="text"
                                        id="name"
                                        className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                                        placeholder="이름"
                                        value={formData.name}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })}
                                    />
                                    <input
                                        type="Date"
                                        id="birth"
                                        className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-placeholder text-opacity-50"
                                        placeholder="생년월일 (예: 20200101)"
                                        value={formData.birth}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            birth: e.target.value
                                        })}
                                    />
                                    <div
                                        className="flex justify-center gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                gender: 'female'
                                            })}
                                            className={`rounded-full p-1 ${
                                                formData.gender === 'female'
                                                    ? 'bg-blue-300'
                                                    : 'bg-gray-100'
                                            }`}
                                        >
                                            <Image
                                                src="/icons/icon-female.svg"
                                                alt="Female"
                                                width={96}
                                                height={96}
                                                className="h-12 w-12"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                gender: 'male'
                                            })}
                                            className={`rounded-full p-1 ${
                                                formData.gender === 'male'
                                                    ? 'bg-blue-300'
                                                    : 'bg-gray-100'
                                            }`}
                                        >
                                            <Image
                                                src="/icons/icon-male.svg"
                                                alt="Male"
                                                width={96}
                                                height={96}
                                                className="h-12 w-12"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </section>
                    </main>

                )
            case 2:
                return (
                    <div className="space-y-6 px-6">
                        <h1 className="text-2xl font-bold">의사소통 수준</h1>
                        <p className="text-sm text-gray-600">보담이의 의사소통 수준을 알려주세요.</p>
                        <div className="space-y-2">
                            {CognitiveOptions.map((option, index) => {
                                const isSelected = formData.cognitive_options.includes(option)

                                const handleOptionClick = () => {
                                    let newOptions: string[]
                                    let newLevel: number

                                    if (isSelected) {
                                        // 이미 선택된 옵션을 제거
                                        newOptions = formData.cognitive_options.filter(item => item !== option)
                                        newLevel = formData.cognitive_level - 1
                                    } else {
                                        // 새 옵션 추가
                                        newOptions = [...formData.cognitive_options, option]
                                        newLevel = formData.cognitive_level + 1
                                    }

                                    setFormData({
                                        ...formData,
                                        cognitive_options: newOptions,
                                        cognitive_level: newLevel
                                    })
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={handleOptionClick}
                                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                                            isSelected
                                                ? 'border-blue-500 bg-[#EAF2FF]'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <span className="text-sm font-normal">{option}</span>
                                        {isSelected && (
                                            <Check className="h-5 w-5 text-blue-500"/>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6 px-6">
                        <h1 className="text-2xl font-bold">일상생활 수행능력</h1>
                        <p className="text-sm text-gray-600">보담이의 일상생활 수행능력을 알려주세요.</p>
                        <div className="space-y-2">
                            {PerformanceOptions.map((option, index) => {
                                const isSelected = formData.performance_options.includes(option)

                                const handleOptionClick = () => {
                                    let newOptions: string[]
                                    let newLevel: number

                                    if (isSelected) {
                                        // 이미 선택된 옵션을 제거
                                        newOptions = formData.performance_options.filter(item => item !== option)
                                        newLevel = formData.performance_level - 1
                                    } else {
                                        // 새 옵션 추가
                                        newOptions = [...formData.performance_options, option]
                                        newLevel = formData.performance_level + 1
                                    }

                                    setFormData({
                                        ...formData,
                                        performance_options: newOptions,
                                        performance_level: newLevel
                                    })
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={handleOptionClick}
                                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                                            isSelected
                                                ? 'border-blue-500 bg-[#EAF2FF]'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <span className="text-sm font-normal">{option}</span>
                                        {isSelected && (
                                            <Check className="h-5 w-5 text-blue-500"/>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )

        }

    }
    return (
        <div className="relative min-h-screen overflow-y-hidden">
            {/* Progress Bar */}
            {step > 0 && (
                <div className="mt-16 mb-12 h-2 ml-8 mr-8 rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${((step) / 3) * 100}%` }}
                    />
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col justify-between ">
                <div className="flex-1 mb-4">
                    {renderStep()}
                </div>
            </div>
            {/* Next Button */}
            <div className="absolute bottom-10 w-full flex-col justify-center items-center flex">
                <button
                    className="w-[85%] bg-blue-400 py-2.5 text-lg font-medium hover:bg-blue-500 rounded-xl text-white transition-colors"
                    onClick={handleNext}
                >
                    다음
                </button>
            </div>

        </div>
    )
}