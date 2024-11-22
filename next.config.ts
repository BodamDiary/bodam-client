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
                hostname: 'img.youtube.com',
            },
        ],
    },
};

export default nextConfig;
