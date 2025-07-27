// /** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.test\.js$/,
      use: 'ignore-loader',
    });

    // Optional: Also ignore test folder inside pdf-parse completely
    config.externals.push('pdf-parse/test/*');

    return config;
  },
};

module.exports = nextConfig;
