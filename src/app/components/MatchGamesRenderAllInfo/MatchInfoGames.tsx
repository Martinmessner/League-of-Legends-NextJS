import {
  getDateCreationGame,
  getHourExactlyGame,
  getMinutesDurationGame,
} from "@/app/helpers/ConvertDateMatches";
import useSummonerStore from "@/app/store/Store";
import styles from "../../page.module.css";
import MatchGroup from "../MatchesWinOrLose/MatchGroup";
import { useState } from "react";

export default function RenderMatchInfoGames() {
  const { MatchGamesRenderAll, summonerName, quantityItems } =
    useSummonerStore();

  const [expandedParticipants, setExpandedParticipants] = useState<number[]>(
    []
  );

  const handleToggle = (participantId: number) => {
    if (expandedParticipants.includes(participantId)) {
      setExpandedParticipants((prev) =>
        prev.filter((id) => id !== participantId)
      );
    } else {
      setExpandedParticipants((prev) => [...prev, participantId]);
    }
  };

  return (
    <>
      {MatchGamesRenderAll
        ? MatchGamesRenderAll.map((data) => {
            const { info } = data;
            const { teams } = info;

            const {
              gameCreation,
              gameVersion,
              gameDuration,
              gameEndTimestamp,
            } = info as {
              gameCreation: number;
              gameVersion: string;
              gameDuration: number;
              gameEndTimestamp: number;
            };

            const participants = info.participants;
            const firstGroup = participants.slice(0, 5);
            const secondGroup = participants.slice(5, 10);

            const winFirstGroup =
              firstGroup.length > 0 ? firstGroup[0].win : false;
            const winSecondGroup =
              secondGroup.length > 0 ? secondGroup[0].win : false;

            return (
              <section key={info.gameId}>
                <section className={styles["header-info-data-game"]}>
                  <h2>
                    {getDateCreationGame(gameCreation)},
                    {getHourExactlyGame(gameEndTimestamp)}.
                  </h2>
                  <h2>
                    Duracion: {getMinutesDurationGame(gameDuration)} Minutos.
                  </h2>
                  <h2>Version: {gameVersion.slice(0, 5)}.</h2>
                </section>
                <div className={styles["div-win-o-lose"]}>
                  <h3
                    className={
                      winFirstGroup === true
                        ? styles["win-color"]
                        : styles["lose-color"]
                    }
                  >
                    {winFirstGroup === true ? "VICTORIA" : "DERROTA"}
                  </h3>

                  <h3
                    className={
                      winSecondGroup === true
                        ? styles["win-color"]
                        : styles["lose-color"]
                    }
                  >
                    {winSecondGroup === false ? "DERROTA" : "VICTORIA"}
                  </h3>
                </div>
                <section className={styles["teamskills-section"]}>
                  {teams.map((data: any, indexTemporal: number) => {
                    const { objectives } = data;

                    return (
                      <section
                        className={styles["section-images-teamskill"]}
                        key={indexTemporal}
                      >
                        <div className={styles["image-baron"]}>
                          <img
                            src="/kill.svg"
                            alt="Asesinatos"
                            title="Asesinatos"
                          ></img>
                          <p> {objectives.champion.kills}</p>
                        </div>
                        <div className={styles["image-baron"]}>
                          <img src="/baron.svg" alt="Baron" title="Baron"></img>
                          <p> {objectives.baron.kills}</p>
                        </div>
                        <div className={styles["image-drake"]}>
                          <img
                            src="/dragon.svg"
                            alt="Dragones"
                            title="Dragones"
                          ></img>
                          <p> {objectives.dragon.kills}</p>
                        </div>
                        <div className={styles["image-drake"]}>
                          <img
                            src="/tower.svg"
                            alt="Torres"
                            title="Torres"
                          ></img>
                          <p> {objectives.tower.kills}</p>
                        </div>
                      </section>
                    );
                  })}
                </section>
                <section
                  key={info.gameId}
                  className={styles["section-participants-info"]}
                >
                  <MatchGroup
                    participants={firstGroup}
                    totalParticipants={participants}
                    winGroup={winFirstGroup}
                    summonerName={summonerName.gameName}
                    quantityItems={quantityItems}
                    expandedParticipants={expandedParticipants}
                    onToggle={handleToggle}
                  />

                  <MatchGroup
                    totalParticipants={participants}
                    participants={secondGroup}
                    winGroup={winSecondGroup}
                    summonerName={summonerName.gameName}
                    quantityItems={quantityItems}
                    expandedParticipants={expandedParticipants}
                    onToggle={handleToggle}
                  />
                </section>
              </section>
            );
          })
        : null}
    </>
  );
}
