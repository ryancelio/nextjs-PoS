
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['knex'],
    },
};
// module.exports = {
//     webpack: (
//       config,
//       { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//     ) => {

//       // Important: return the modified config
//       return config
//     },
//   }

export default nextConfig;
