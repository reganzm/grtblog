module.exports = {
  apps: [
    {
      name: 'grtblog-frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
