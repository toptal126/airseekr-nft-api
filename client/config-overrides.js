module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    // http: require.resolve("stream-http"),
    https: false,
    // zlib: require.resolve("browserify-zlib"),
    os: false,
    // path: require.resolve("path-browserify"),
    // stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
    util: require.resolve("util"),
    crypto: require.resolve("crypto-browserify"),
  };
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
