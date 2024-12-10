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
    // api: {
    //   bodyParser: false, // Disable default body parser for file uploads
    // },
    transpilePackages: ['next-international', 'international-types'],
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
    webpack(config, { isServer }) {
      if (isServer) {
        config.externals.push('@ffmpeg-installer/ffmpeg', 'fluent-ffmpeg');
      }
      config.module.rules.push({
        test: /\.svg$/, // Match SVG files
        use: ['@svgr/webpack'], // Use SVGR to transform them into React components
      });
  
      return config;
    },
}

export default nextConfig;