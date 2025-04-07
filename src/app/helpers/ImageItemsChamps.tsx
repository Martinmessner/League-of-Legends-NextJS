import { useState } from "react";
import styles from "../page.module.css";

const ImgItemsChampionsSummoners = ({ idItem }: { idItem: string }) => {
  const [hasError, setHasError] = useState(false);

  if (!idItem) return null;

  const itemChampion = `https://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${idItem}.png`;
  const fallbackImage = "/fallback.png"; // Asegurate de tener esta imagen en tu carpeta `public`

  return (
    <img
      className={styles["item-champion"]}
      src={hasError ? fallbackImage : itemChampion}
      alt="item"
      title={idItem}
      onError={() => setHasError(true)}
    />
  );
};

export default ImgItemsChampionsSummoners;
