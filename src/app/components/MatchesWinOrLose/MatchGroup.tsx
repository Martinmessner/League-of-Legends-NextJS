import useSummonerStore, {
  type MatchGroupProps,
  type Participant,
} from "../../store/Store";
import ImageChampionSummoner from "@/app/helpers/ImageChampions";
import ImgItemsChampionsSummoners from "@/app/helpers/ImageItemsChamps";
import styles from "../../page.module.css";

export default function MatchGroup({
  participants,
  winGroup,
  quantityItems,
  expandedParticipants,
  onToggle,
}: MatchGroupProps) {
  const { summonerName: currentSummonerNames } = useSummonerStore();

  console.log(currentSummonerNames);

  return (
    <section>
      {participants.map((participant: Participant) => {
        const {
          puuid,
          champLevel,
          championName,
          riotIdGameName,
          summonerName,
          participantId,
          kills,
          assists,
          deaths,
          totalDamageTaken,
          totalDamageDealtToChampions,
          totalMinionsKilled,
          visionWardsBoughtInGame,
          wardsKilled,
          wardsPlaced,
        } = participant;

        console.log(participant);
        console.log(riotIdGameName);

        const isSummonerNameIncluded =
          Array.isArray(currentSummonerNames) &&
          currentSummonerNames.includes(riotIdGameName);

        return (
          <div
            className={`${winGroup ? styles.victoria : styles.derrota} ${
              styles["div-participants-info-1"]
            }`}
            key={puuid}
            onClick={() => {
              onToggle(participantId);
            }}
          >
            <div className={styles["champion-container"]}>
              <p className={styles["riotid-name"]}>{riotIdGameName}</p>
              <ImageChampionSummoner imageChampion={championName} />
            </div>
            <small className={styles["champlevel-absolute"]}>
              {champLevel}
            </small>
            <h4
              className={`${
                isSummonerNameIncluded
                  ? styles.colorunico
                  : styles["no-selected-username"]
              } ${styles["participant-summonername"]}`}
            >
              {summonerName}
              <div className={styles["list-items"]}>
                {quantityItems.map((itemIndex: number) => (
                  <ImgItemsChampionsSummoners
                    key={itemIndex}
                    idItem={participant[`item${itemIndex}`]}
                  />
                ))}
              </div>
              <button
                className={styles["toogle-button"]}
                onClick={() => {
                  onToggle(participantId);
                }}
              >
                {expandedParticipants.includes(participantId)
                  ? "🔼 Ocultar"
                  : "🔽 Mostrar Más"}
              </button>
            </h4>
            <div className={styles["info-aditional"]}>
              <h4>
                KDA: {kills}/
                <span className={styles["deaths-red"]}>{deaths}</span>/{assists}
              </h4>
              {expandedParticipants.includes(participantId) && (
                <div className={styles["info-aditional"]}>
                  <h5>Daño Recibido: {totalDamageTaken}</h5>
                  <h5>Daño a Campeones: {totalDamageDealtToChampions}</h5>
                  <h5>Subditos: {totalMinionsKilled}</h5>
                  <h5>Pinks/Control Ward: {visionWardsBoughtInGame}</h5>
                  <h5>Wards Destroyed: {wardsKilled}</h5>
                  <h5>Wards Puestas: {wardsPlaced}</h5>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
