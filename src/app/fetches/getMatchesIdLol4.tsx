import { useEffect } from "react";
import useSummonerStore from "../store/Store";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
function GetMatchesPuuid() {
  const {
    puuidSummonerName,
    setHistoryMatchGames,
    Seterror,
    modifyContinentSelected,
  } = useSummonerStore();

  useEffect(() => {
    async function fetchAllData() {
      const matchesDataArray = [];

      if (!Array.isArray(puuidSummonerName)) {
        return;
      }

      for (const matchesId of puuidSummonerName) {
        try {
          const url = await fetch(
            `https://${modifyContinentSelected}.api.riotgames.com/lol/match/v5/matches/${matchesId}?api_key=${API_KEY}`
          );
          const data = await url.json();

          matchesDataArray.push(data);
        } catch (error) {
          Seterror("No Tiene Partidas Disponibles.");
        }
      }
      setHistoryMatchGames(matchesDataArray);
    }

    void fetchAllData();
  }, [
    puuidSummonerName,
    modifyContinentSelected,
    setHistoryMatchGames,
    Seterror,
  ]);

  return null;
}

export default GetMatchesPuuid;
