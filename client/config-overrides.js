module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    assert: false,
    // assert: require.resolve("assert"),
    fs: false,
    tls: false,
    net: false,
    http: false,
    // http: require.resolve("stream-http"),
    https: false,
    // https: require.resolve("https-browserify"),
    // zlib: require.resolve("browserify-zlib"),
    os: false,
    // os: require.resolve("os-browserify"),
    path: false,
    // path: require.resolve("path-browserify"),
    stream: false,
    // stream: require.resolve("stream-browserify"),
    url: false,
    // url: require.resolve("url"),
    util: false,
    // util: require.resolve("util"),
    crypto: require.resolve("crypto-browserify"),
  };
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
