export const kelvinToCelsius = (tempK: number) => {
  const celsius = tempK - 273.15;

  return celsius.toFixed(2);
};

export const dateString = (date: number) => {
  const d = new Date(date * 1000); // Convert seconds to milliseconds

  const formattedDate = d.toLocaleString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
  });
  return formattedDate;
};

export const msToKmh = (speedMs: number): number => {
  return parseFloat((speedMs * 3.6).toFixed(2));
};

export const formatTimezone = (offset: number): string => {
  const hours = Math.floor(offset / 3600);
  const sign = hours >= 0 ? "+" : "-";
  return `UTC${sign}${Math.abs(hours)}`;
};
