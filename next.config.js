/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'platform-lookaside.fbsbx.com',
                port: '',
                pathname: '/platform/profilepic/**'
            },
            {
                protocol: 'https',
                hostname: '**.spotifycdn.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '**.scdn.co',
                port: '',
                pathname: '/**'
            }
        ]
    },
};

module.exports = nextConfig;
