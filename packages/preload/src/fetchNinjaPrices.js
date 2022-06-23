import log from "electron-log";

const leagueMap = {
  lsc: "League",
  lhc: "LeagueHC",
  std: "Standard",
};

export const fetchNinjaPrices = async (poeLeague) => {
  log.info("Fetching PoE.Ninja currency prices...");
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/${
        leagueMap[poeLeague] ?? "League"
      }/Currency.txt?ts=${new Date().getTime()}`,
      { method: "GET" }
    );
    log.info("Fetched PoE.Ninja currency prices.");
    const data = await res.json();
    return data;
  } catch (e) {
    log.error("Unable to get PoE.Ninja currency prices.", e);
  }
};
