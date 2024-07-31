export const getDateCreationGame = (game: number): string => {
  const gameCreationDate = new Date(game);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formattedGameCreationDate = gameCreationDate.toLocaleDateString(
    "es-ES",
    options
  );
  return formattedGameCreationDate;
};

export const getMinutesDurationGame = (game: number): string => {
  // Asume que `game` es una duración en milisegundos.
  const duracionPartidaMinutos = game / 60;
  return duracionPartidaMinutos.toFixed();
};

export const getHourExactlyGame = (game: number): string => {
  const gameEndDate = new Date(game);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const formattedGameEndDate = gameEndDate.toLocaleTimeString("es-ES", options);
  return formattedGameEndDate;
};

export const getTimeStampsGame = (timestamps: number[]): number[] => {
  const minutos: number[] = [];
  for (const milisegundos of timestamps) {
    const minutosItem = Math.floor(milisegundos / (1000 * 60));
    minutos.push(minutosItem);
  }
  return minutos;
};
