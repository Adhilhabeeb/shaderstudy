module.exports = {
  webpack(config:any) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: "raw-loader",
    });
    return config;
  },
};
