/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  }
}
webpack: (config) => {
  config.module.rules.push({
    test: /\.test\.js$/,
    use: 'ignore-loader',
  });
  return config;
}

module.exports = nextConfig
