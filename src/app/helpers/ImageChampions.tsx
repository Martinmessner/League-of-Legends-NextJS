import styles from "../page.module.css";

const ImageChampionSummoner = ({
  imageChampion,
}: {
  imageChampion: string;
}) => {
  if (!imageChampion) {
    return;
  }
  const imgChampion = `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${imageChampion}.png`;

  return (
    <img
      className={`${styles["champion-icon"]}`}
      src={imgChampion}
      alt={imageChampion}
      title={imageChampion}
    />
  );
};

export default ImageChampionSummoner;
