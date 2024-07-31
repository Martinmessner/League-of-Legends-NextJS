"use client";
import { FormDataTest } from "@/actions/testFormData";
import { regionWorld } from "../helpers/RegionWorld";
import { SubmitButton } from "./Button/SubmitButton";
import useSummonerStore, { type SummonerData } from "../store/Store";
import GetPuuidSummonerNameFetch from "./GetFetchPuuidSummonerName";
import InfoAllMatches from "./GetRenderInfoAllMatches";
import styles from "../page.module.css";
import ErrorMessagesAlert from "./Errors/ErrorMessageAlert";

export default function GetSummonerName() {
  const {
    setSummonerName,
    summonerName,
    setmodifyContinentSelected,
    setselectedRegionWorld,
    error,
  } = useSummonerStore();

  return (
    <>
      <header className={`${styles.header}`}>
        <h1 className={`${styles["nick-principal"]}`}>
          Busca tu Nombre de Invocador de
        </h1>
        <img src="/lol.svg" alt="lol" width="40px"></img>
      </header>
      <form
        className={`${styles.header}`}
        action={async (formData) => {
          ("use server");

          const { result, contentSelected, valueRegionSelected } =
            await FormDataTest(formData);

          setmodifyContinentSelected(contentSelected);
          setSummonerName(result as SummonerData);
          setselectedRegionWorld(valueRegionSelected);
        }}
      >
        <select name="regionWorld">
          <option value="">Selecciona una región.</option>
          {regionWorld.map((region) => {
            const regionKey = Object.keys(region)[0];

            return (
              <option key={regionKey} value={regionKey}>
                {regionKey}
              </option>
            );
          })}
        </select>
        <input
          name="summonerName"
          type="text"
          placeholder="Invocador..."
        ></input>
        <SubmitButton />
      </form>

      <ErrorMessagesAlert error={error} />

      {summonerName.puuid ? <InfoAllMatches /> : null}
      <GetPuuidSummonerNameFetch />
    </>
  );
}
