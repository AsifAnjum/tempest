export const kelvinToCelsius = (tempK: number) => {
  const celsius = tempK - 273.15;

  return celsius.toFixed(2);
};

export const dateString = (date: number, dayOnly = false) => {
  const d = new Date(date * 1000); // Convert seconds to milliseconds
  let formattedDate;

  if (dayOnly) {
    formattedDate = d.toLocaleDateString("en-US", {
      weekday: "long",
      hour12: true,
      hour: "2-digit",
    });
  } else {
    formattedDate = d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

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
