const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function MatchesIdDetailsGame(
  matchesId: string,
  modifyContinentSelected: string
) {
  const response = await fetch(
    `https://${modifyContinentSelected}.api.riotgames.com/lol/match/v5/matches/${matchesId}?api_key=${API_KEY}`
  );

  const result = await response.json();

  return result;
}
