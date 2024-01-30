/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'localhost,google.com,facebook.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  env: {
    token: 'QpwL5tke4Pnpja7X4',
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        missing: [
          {
            type: 'host',
            value: 'localhost',
          },
          {
            type: 'host',
            value: 'google.com',
          },
          {
            type: 'host',
            value: 'facebook.com',
          },
        ],
        permanent: false,
        destination: '/404',
      },
      {
        source: '/',
        missing: [
          {
            type: 'cookie',
            key: 'token',
            value: 'QpwL5tke4Pnpja7X4',
          },
        ],
        permanent: false,
        destination: '/login',
      },
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'token',
            value: 'QpwL5tke4Pnpja7X4',
          },
        ],
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
