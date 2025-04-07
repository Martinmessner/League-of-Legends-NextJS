import GetRankedImageUser4 from "@/app/fetches/getRankedLol5";
import useSummonerStore, { type RankData } from "@/app/store/Store";
import { useEffect, useState } from "react";
import RankingAndPointsDivisionUser from "../RankingUser/RankingAndPointsUser";
import { TimeLoading } from "@/app/helpers/LoadingRender";

export default function GetRankTierSummoner() {
  const {
    puuidSummonerName,
    SetgetUserRankAndLP,
    MatchGamesRenderAll,
    summonerName,
    SetrankSummonerId,
  } = useSummonerStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (MatchGamesRenderAll) {
      const newRankSummonerId = MatchGamesRenderAll.flatMap(
        (data) => data.info.participants
      ).find(
        (data2) => data2.summonerName === summonerName.gameName
      )?.summonerId;

      if (newRankSummonerId) {
        SetrankSummonerId(newRankSummonerId as string);
        console.log(newRankSummonerId);
      }
    }
  }, [summonerName.gameName, MatchGamesRenderAll, SetrankSummonerId]);

  const fetchRankData = async (id: string) => {
    try {
      const data: RankData = await GetRankedImageUser4(id);

      SetgetUserRankAndLP(data);
      setLoading(false);
    } catch (error) {
      console.error("Error falopa: ", error);
    }
  };

  useEffect(() => {
    if (puuidSummonerName.id) {
      void fetchRankData(puuidSummonerName.id);
    }
  }, [puuidSummonerName]);

  return (
    <>
      {loading ? (
        <div className="center-time-ranks">
          <TimeLoading />
        </div>
      ) : (
        <RankingAndPointsDivisionUser />
      )}
    </>
  );
}
