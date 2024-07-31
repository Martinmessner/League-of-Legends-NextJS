import { RankImagesInfo } from "@/app/helpers/InfoDataImageRank";
import styles from "../../page.module.css";

function ImagesRankingAndTier({ tier }: { tier: string }) {
  const matchingRank = RankImagesInfo.find((ranks) => ranks.rank === tier);

  if (matchingRank) {
    const { rank, url } = matchingRank;
    return (
      <div key={rank}>
        <img
          className={styles["test-image"]}
          alt={rank}
          title={rank[0] + rank.slice(1).toLowerCase()}
          src={url}
        ></img>
      </div>
    );
  } else {
    return null;
  }
}

export default ImagesRankingAndTier;
