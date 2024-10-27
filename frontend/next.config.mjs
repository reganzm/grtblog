/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log('Rewrites function called');
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8080/api/:path*', // Proxy to Backend
      },
    ];
  },
  images: {
    domains: ['dogeoss.grtsinry43.com'],
  },
};

export default nextConfig;
