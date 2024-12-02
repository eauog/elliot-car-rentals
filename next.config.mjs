/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], 
      },
      typescript: {
        ignoreBuildErrors: true, // Ignores TypeScript errors during the build process
      },
};

export default nextConfig;
