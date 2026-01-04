/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config:any) => {
    // GLSL / shader loader
    config.module.rules.push({
    test: /\.(glsl|vs|fs)$/,
  use: ["raw-loader", "glslify-loader"]
    });

    // Hot reload fix (file watching)
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};

module.exports = nextConfig;
