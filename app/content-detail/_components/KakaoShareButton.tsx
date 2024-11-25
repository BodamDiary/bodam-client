"use client";

import { useEffect } from "react";
import Image from "next/image";

interface KakaoShareButtonProps {
  url: string;
  thumbnail: string;
  title: string;
  tag: string;
}

const KakaoShareButton = ({url, thumbnail, title, tag} : KakaoShareButtonProps) => {
console.log(url);
  useEffect(() => {
    const loadKakaoSDK = async () => {
      if (typeof window.Kakao === "undefined") {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error("Kakao SDK 로드 실패"));
        });
      }

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("e854eba76dd1733b0ab3baeb0b60a3a8"); // 자신의 JavaScript Key로 변경
      }
    };

    loadKakaoSDK().catch((error) => console.error(error));
  }, []);

  const shareMessage = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    // Kakao 공유 메시지 보내기
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: tag,
        imageUrl: thumbnail,
        link: {
          mobileWebUrl: "https://www.youtube.com", // 개발 환경
          webUrl: "https://www.youtube.com", // 개발 환경
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
              mobileWebUrl: url,
              webUrl: url,
          },
        },
        {
          title: "앱으로 보기",
          link: {
              mobileWebUrl: url,
              webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={shareMessage}
    >
      <Image
        src="/icons/icon-share.svg"
        alt="share"
        className="w-full"
        width={20}
        height={20}
      />
    </button>
  );
};

export default KakaoShareButton;
