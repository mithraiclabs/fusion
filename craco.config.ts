const cracoConfig = {
  webpack: {
    configure: (config: Record<string, Record<string, unknown>>) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          path: false,
          os: false,
          stream: false,
        },
      };
      return config;
    },
  },
};

export default cracoConfig;
