import { useEffect } from "react";
import useSummonerStore, { type SummonerData } from "../store/Store";
import GetInfoUser2Fetch from "../fetches/getInfoAllLol2";
import ProfileIcon from "../helpers/ProfileIconSummoner";
import GetMatchesAll from "./GetAllMatchesRender";
import { TimeLoading } from "../helpers/LoadingRender";
import styles from "../page.module.css";
import RenderMatchInfoGames from "./MatchGamesRenderAllInfo/MatchInfoGames";
import GetRankTierSummoner from "./RankSummonerUser/GetRankSummoner";

export default function GetPuuidSummonerNameFetch() {
  const {
    summonerName,
    setPuuidSummonerName,
    puuidSummonerName,
    loading,
    Setloading,
    selectedRegion,
    Seterror,
  } = useSummonerStore();

  const isEmptyObject = Object.keys(summonerName).length === 0;

  const fetchUserData = async (puuid: string) => {
    try {
      Setloading(true);
      const data: SummonerData = await GetInfoUser2Fetch(puuid, selectedRegion);
      setPuuidSummonerName(data);
      Setloading(false);
    } catch (error) {
      Seterror(`Error de Datos!`);
      Setloading(false);
    }
  };

  useEffect(() => {
    if (summonerName.puuid) {
      void fetchUserData(summonerName.puuid);
    }
  }, [summonerName]);

  if (isEmptyObject || !puuidSummonerName.puuid) return null;

  return (
    <>
      {loading ? (
        <div className={styles.centertime}>
          <TimeLoading />
        </div>
      ) : (
        <>
          {!isEmptyObject && (
            <section className={`${styles["summonername-main"]}`}>
              <div className={`${styles["summonername-div"]}`}>
                <ProfileIcon iconId={puuidSummonerName.profileIconId} />
                <p>{puuidSummonerName.profileIconId}</p>
                <p>{summonerName.gameName}</p>
                <p>Nivel {puuidSummonerName.summonerLevel}</p>
              </div>
              <GetRankTierSummoner />
            </section>
          )}
          <GetMatchesAll />
          <RenderMatchInfoGames />
        </>
      )}
    </>
  );
}
