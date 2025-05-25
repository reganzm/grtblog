module.exports = {
  apps: [
    {
      name: 'grtblog-frontend',
      script: 'pnpm',
      //args:'start',
      args: 'dev',
      env: {
        NODE_ENV: 'dev',
        //NODE_ENV: 'production',
      },
    },
  ],
};
