"use server";

import { continentsAll, regionWorld } from "@/app/helpers/RegionWorld";

export const FormDataTest = async (formData: FormData) => {
  const getFormData = {
    summonerName: formData.get("summonerName") as string,
    tagLine: formData.get("tagLine") as string,
    regionWorld: formData.get("regionWorld") as string | null,
  };

  let contentSelected = "";
  let valueRegionSelected = "";
  const region = getFormData.regionWorld ?? "";
  const summonerName = getFormData.summonerName;
  const tagLine = getFormData.tagLine;

  for (const tomate of regionWorld) {
    const keys = Object.keys(tomate);
    const value = Object.values(tomate);

    if (keys.includes(region)) {
      valueRegionSelected = value.toString();
    }
  }

  const searchUniqueRegion = Object.entries(continentsAll);
  searchUniqueRegion.some(([key, value]) => {
    const countries = value.split(", ");
    if (countries.includes(region)) {
      contentSelected = key;
    }
    return false;
  });

  const response = await fetch(
    `https://${contentSelected}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const result = await response.json();
  console.log(result);
  return { result, contentSelected, valueRegionSelected };
};
