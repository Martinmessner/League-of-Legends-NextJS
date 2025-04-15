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
        <input
          name="tagLine"
          type="text"
          placeholder="Tag (ej: LAN)"
          required
        />
        <SubmitButton />
      </form>

      <ErrorMessagesAlert error={error} />

      {summonerName.puuid ? <InfoAllMatches /> : null}
      <GetPuuidSummonerNameFetch />
    </>
  );
}

/*
<form
  className={`${styles.header}`}
  action={async (formData) => {
    "use server";

    const { result, contentSelected, valueRegionSelected } =
      await FormDataTest(formData);

    setmodifyContinentSelected(contentSelected);
    setSummonerName(result as SummonerData);
    setselectedRegionWorld(valueRegionSelected);
  }}
>
  <select name="regionWorld" required>
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
    name="gameName"
    type="text"
    placeholder="Nombre de invocador (ej: Juanito)"
    required
  />
  <input
    name="tagLine"
    type="text"
    placeholder="Tag (ej: LAN)"
    defaultValue="LAN"
    required
  />

  <SubmitButton />
</form>
 */
