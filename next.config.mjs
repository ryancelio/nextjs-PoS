
/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['knex'],
    // experimental: {
    //     serverComponentsExternalPackages: ['knex'],
    // },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        return config;
    }
};

export default nextConfig;
