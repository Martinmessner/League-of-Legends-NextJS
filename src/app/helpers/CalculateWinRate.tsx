function CalculateWinRateUser(wins: number, losses: number) {
  const totalGames = wins + losses;
  return ((wins / totalGames) * 100).toFixed();
}

export default CalculateWinRateUser;
