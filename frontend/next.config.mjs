/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log('Rewrites function called');
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:8080/api/v1/:path*', // Proxy to Backend
      },
    ];
  },
  images: {
    domains: ['dogeoss.grtsinry43.com'],
  },
  // 没办法，先暂时抑制警告了
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  }
};

export default nextConfig;
