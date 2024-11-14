/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    // images: {
    //     disableStaticImages: true,
    // },
    // output: 'standalone',
    env: {
      ENVIRONMENT: process.env.ENVIRONMENT,
    }
}

export default nextConfig;