export const fetchTFTPrices = async (league) => {
  const res = await fetch(
    `https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/${league}/harvest.json?ts=${new Date().getTime()}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
};
