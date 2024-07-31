import { useEffect } from "react";
import MatchesIdDetailsGame from "../fetches/getMatchesId";
import useSummonerStore from "../store/Store";

export default function InfoAllMatches() {
  const { setMatchGamesRenderAll, historyMatchGames, modifyContinentSelected } =
    useSummonerStore();

  useEffect(() => {
    void (async function fetchAllData() {
      const matchesDataArray = [];

      for (const matchesId of historyMatchGames) {
        try {
          const data = await MatchesIdDetailsGame(
            matchesId as string,
            modifyContinentSelected
          );
          matchesDataArray.push(data);
        } catch (error) {
          console.log("No Tiene Partidas Disponibles.", error);
        }
      }
      setMatchGamesRenderAll(matchesDataArray);
    })();
  }, [historyMatchGames, modifyContinentSelected, setMatchGamesRenderAll]);

  return null;
}
