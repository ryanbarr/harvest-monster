import compare from "semver-compare";
import { fetchLatestVersion, getAppVersion } from "#preload";

export const isNewVersionAvailable = async () => {
  const { version } = await fetchLatestVersion();
  const appVersion = await getAppVersion();
  const versions = [version, appVersion].sort(compare).reverse();

  return versions?.[0] !== appVersion;
};
