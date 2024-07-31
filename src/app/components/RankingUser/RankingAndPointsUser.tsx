import useSummonerStore, { type RankInfo } from "../../store/Store";
import styles from "../../page.module.css";
import CalculateWinRateUser from "../../helpers/CalculateWinRate";
import { TypeQueueRanked } from "../../helpers/TypesQueueRanked";
import ImagesRankingAndTier from "../RankImages/RenderRankImages";

function RankingAndPointsDivisionUser() {
  const { getUserRankAndLP } = useSummonerStore();

  return (
    <section className={styles["contenedor-ranks"]}>
      {getUserRankAndLP.length > 0 && (
        <>
          {getUserRankAndLP
            .filter((RankUser: RankInfo) => RankUser.queueType !== "CHERRY")
            .map((RankUser: RankInfo) => {
              const {
                freshBlood,
                hotStreak,
                inactive,
                leaguePoints,
                losses,
                queueType,
                wins,
                rank,
                tier,
                leagueId,
              } = RankUser;

              const winRate = CalculateWinRateUser(wins, losses);
              const totalGames = wins + losses;
              return (
                <article
                  className={styles["contenedor-ranks-article"]}
                  key={leagueId}
                >
                  <p>
                    {
                      TypeQueueRanked[
                        queueType as "RANKED_FLEX_SR" | "RANKED_SOLO_5x5"
                      ]
                    }
                  </p>
                  <p>{freshBlood}</p>
                  <p>{hotStreak}</p>
                  <p>{inactive}</p>
                  <div className={styles["imagerank-lp-rank"]}>
                    <ImagesRankingAndTier tier={tier} />
                    <small>Rank: {rank}</small>
                    <small>LP: {leaguePoints}</small>
                  </div>
                  <div className={styles["small-wins-losses-wr"]}>
                    <small>Partidas Totales: {totalGames}</small>
                    <small>Wins: {wins}</small>
                    <small>Losses: {losses}</small>
                    <small>Win rate: {winRate}%</small>
                  </div>
                </article>
              );
            })}
        </>
      )}

      {getUserRankAndLP.length === 0 && <p>Este usuario es Unranked.</p>}
    </section>
  );
}

export default RankingAndPointsDivisionUser;
