import type { NextConfig } from "next";
import { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (
    config: Configuration,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    if (config.module) {
      if (!config.module.rules) {
        config.module.rules = []; // Initialize rules if it's undefined
      }
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    } else {
      config.module = { // Initialize module if it's undefined (though unlikely in Next.js)
        rules: [{
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        }]
      };
    }

    return config;
  },
  /* config options here */
};

export default nextConfig;