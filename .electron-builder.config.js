import pkg from "./package.json";

if (process.env.VITE_APP_VERSION === undefined) {
  // const now = new Date();
  process.env.VITE_APP_VERSION = pkg.version;
  // process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${
  //   now.getUTCMonth() + 1
  // }.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
  fileAssociations: {
    ext: "png",
    name: "PNG",
    icon: "icon.png",
  },
  extraMetadata: {
    version: pkg.version,
  },
  linux: {
    target: ["deb", "AppImage"],
  },
  productName: "HarvestMonster",
};

module.exports = config;
