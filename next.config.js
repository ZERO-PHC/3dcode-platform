/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  domains: ["media.discordapp.net"],
};

// create the config for a network image that can be used in the src property of an image tag
// https://nextjs.org/docs/basic-features/image-optimization

module.exports = nextConfig;
