if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date();
  process.env.VITE_APP_VERSION = `1${now.getUTCFullYear() - 2000}.${
    now.getUTCMonth() + 1
  }.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
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
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64", "ia32"],
      },
    ],
  },
  linux: {
    artifactName: "${productName}.${ext}",
    target: ["deb", "AppImage"],
  },
  nsis: {
    artifactName: "${productName}-Setup-${version}.${ext}",
    oneClick: true,
    perMachine: false,
    runAfterFinish: true,
    deleteAppDataOnUninstall: true,
  },
  productName: "HarvestMonster",
  publish: {
    provider: "github",
  },
};

module.exports = config;
