import log from "electron-log";

export const fetchLatestVersion = async () => {
  log.info("Checking latest app version reported by HarvestMonster...");
  try {
    const res = await fetch(
      `https://www.harvestmonster.com/api/version?ts=${new Date().getTime()}`,
      { method: "GET" }
    );
    const data = await res.json();
    log.info("Fetch latest version from HarvestMonster: ", data);
    return data;
  } catch (e) {
    log.error("Unable to check for latest app version.", e);
  }
};
