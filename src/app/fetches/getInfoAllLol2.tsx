const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function GetInfoUser2Fetch(
  puuid: string,
  selectedRegion: string
) {
  const response = await fetch(
    `https://${selectedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
  );

  const result = await response.json();

  return result;
}
