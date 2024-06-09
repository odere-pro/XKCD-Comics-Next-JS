/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imgs.xkcd.com',
            },
        ],
    },
}

export default nextConfig
