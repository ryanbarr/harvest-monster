if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date();
  process.env.VITE_APP_VERSION = process.env.npm_package_version;
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
    version: process.env.VITE_APP_VERSION,
  },
  linux: {
    target: ["deb", "AppImage"],
  },
  productName: "HarvestMonster",
};

module.exports = config;
