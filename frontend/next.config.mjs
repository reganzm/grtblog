/** @type {import('next').NextConfig} */
const nextConfig = {
    // async headers() {
    //
    //   return [
    //     {
    //       source: '/api/v1/:path*',
    //       headers: [
    //         {
    //           key: 'Access-Control-Allow-Origin',
    //           value: '*',
    //         },
    //         {
    //           key: 'Access-Control-Allow-Methods',
    //           value: 'GET, POST, PUT, DELETE, OPTIONS',
    //         },
    //         {
    //           key: 'Access-Control-Allow-Headers',
    //           value: 'X-Requested-With, Content-Type, Accept',
    //         },
    //       ],
    //     },
    //   ];
    // },
    // async rewrites() {
    //
    //   return [
    //     {
    //       source: '/socket.io/:path*',
    //       destination: 'http://127.0.0.1:9092/socket.io/:path*',
    //     },
    //   ];
    // },
    images: {
        domains: ['dogeoss.grtsinry43.com', 'www.w3school.com.cn', 'blogoss.grtsinry43.com', '127.0.0.1', 'next.blog.grtsinry43.com', 'blog.grtsinry43.com'],
    },
    // 没办法，先暂时抑制警告了
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
};

export default nextConfig;
