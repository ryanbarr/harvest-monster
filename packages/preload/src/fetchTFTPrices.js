import log from "electron-log";

export const fetchTFTPrices = async (league) => {
  log.info("Fetching TFT craft prices...");
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/${
        league.code
      }/harvest.json?ts=${new Date().getTime()}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    log.info("Fetched TFT craft prices.");
    return data;
  } catch (e) {
    log.error("Unable to get TFT craft prices.", e);
  }
};
