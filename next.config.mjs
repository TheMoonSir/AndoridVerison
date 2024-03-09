/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/live/Script',
                destination: '/Monaco/index.html'
            }
        ]
    }
};

export default nextConfig;
