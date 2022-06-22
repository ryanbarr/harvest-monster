const leagueMap = {
  lsc: "League",
  lhc: "LeagueHC",
  std: "Standard",
};

export const fetchNinjaPrices = async (poeLeague) => {
  const res = await fetch(
    `https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/${
      leagueMap[poeLeague] ?? "League"
    }/Currency.txt?ts=${new Date().getTime()}`,
    { method: "GET" }
  );
  const data = await res.json();
  return data;
};
