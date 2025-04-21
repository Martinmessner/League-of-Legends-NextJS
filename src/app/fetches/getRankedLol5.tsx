const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function GetRankedImageUser4(
  id: string,
  selectedRegion: string
) {
  const response = await fetch(
    `https://${selectedRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
  );

  const result = await response.json();

  return result;
}
