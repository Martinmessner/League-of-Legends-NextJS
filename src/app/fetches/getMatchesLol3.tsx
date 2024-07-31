interface GetMatchesAll3Params {
  puuid: string;
  pagination: number;
  startIndex: number;
  modifyContinentSelected: string;
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function GetMachesAll3({
  puuid,
  pagination,
  startIndex,
  modifyContinentSelected,
}: GetMatchesAll3Params): Promise<any> {
  const response = await fetch(
    `https://${modifyContinentSelected}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${startIndex}&count=${pagination}&api_key=${API_KEY}`
  );

  const result = await response.json();

  return result;
}
