"use server";

import { continentsAll, regionWorld } from "@/app/helpers/RegionWorld";

export const FormDataTest = async (formData: FormData) => {
  const getFormData = {
    summonerName: formData.get("summonerName") as string,
    regionWorld: formData.get("regionWorld") as string | null,
  };

  let contentSelected = "";
  let valueRegionSelected = "";
  const region = getFormData.regionWorld ?? ""; // Valor de la región seleccionada
  const summonerName = getFormData.summonerName; // Valor del nombre del invocador

  for (const tomate of regionWorld) {
    const keys = Object.keys(tomate);
    const value = Object.values(tomate);

    if (keys.includes(region)) {
      const valueToString = value.toString();
      valueRegionSelected = valueToString;
    }
  }

  const searchUniqueRegion = Object.entries(continentsAll);
  searchUniqueRegion.some((data) => {
    const [key, value] = data;

    const countries = value.split(", ");
    if (countries.includes(region)) {
      contentSelected = key;
    }
    return false;
  });

  const response = await fetch(
    `https://${contentSelected}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${region}?api_key=RGAPI-6010be4d-2bec-4336-8593-85418bf02563`
  );

  const result = await response.json();

  return { result, contentSelected, valueRegionSelected };
};
