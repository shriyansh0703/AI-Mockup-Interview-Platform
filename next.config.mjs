/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['@prisma/client'], // Ensures compatibility
    },
  };
  
  export default nextConfig;