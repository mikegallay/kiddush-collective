/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    // images: {
    //     disableStaticImages: true,
    // },
    // output: 'standalone',
    env: {
      ENVIRONMENT: process.env.ENVIRONMENT,
    },
    transpilePackages: ['next-international', 'international-types'],
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
}

export default nextConfig;