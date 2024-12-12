module.exports = {
    siteUrl: 'https://blog.grtsinry43.com', // 替换为你的域名
    generateRobotsTxt: true,          // 同时生成 robots.txt
    changefreq: 'daily',              // 修改频率
    priority: 0.7,                    // 默认优先级
    exclude: ['/api/*'],              // 排除的路由
    transform: async (config, path) => {
        return {
            loc: path,                   // 每个路径的完整 URL
            lastmod: new Date().toISOString(),
            changefreq: config.changefreq,
            priority: config.priority,
        };
    },
};
