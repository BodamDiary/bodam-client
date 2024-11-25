import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true'
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://bodam.site'
                    },
                ]
            }
        ]
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com', // 기존 설정
            },
            {
                protocol: 'https',
                hostname: 'bodambucket.s3.amazonaws.com', // S3 버킷 도메인 추가
            },
        ],
    },
};

export default nextConfig;
