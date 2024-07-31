import { useEffect, useState } from "react";
import useSummonerStore from "../store/Store";
import GetMachesAll3 from "../fetches/getMatchesLol3";
import { TimeLoading } from "../helpers/LoadingRender";
import styles from "../page.module.css";

export default function GetMatchesAll() {
  const [loading, setLoading] = useState(false);
  const {
    puuidSummonerName,
    setHistoryMatchGames,
    setCurrentPage,
    currentPage,
    pagination,
    modifyContinentSelected,
  } = useSummonerStore();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchUserData = async (puuid: string, page: number) => {
    try {
      setLoading(true);
      const startIndex = (page - 1) * pagination;
      const data = await GetMachesAll3({
        puuid,
        pagination,
        startIndex,
        modifyContinentSelected,
      });
      if (Array.isArray(data)) {
        setHistoryMatchGames(data);
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { puuid } = puuidSummonerName;
    if (puuid) {
      void fetchUserData(puuid, currentPage);
    }
  }, [puuidSummonerName, currentPage, pagination]);

  return (
    <>
      {loading ? (
        <div className={styles.centertime}>
          <TimeLoading />
        </div>
      ) : (
        <>
          {puuidSummonerName?.puuid?.length > 0 ? (
            <div className={`${styles["next-back-pages"]}`}>
              <button
                className={`${styles["arrow-button"]}`}
                onClick={() => {
                  handlePageChange(currentPage - 1);
                }}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <p className={`${styles["actual-page"]}`}>
                Pagina Actual: {currentPage}
              </p>
              <button
                className={`${styles["arrow-button"]}`}
                onClick={() => {
                  handlePageChange(currentPage + 1);
                }}
              >
                &gt;
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
