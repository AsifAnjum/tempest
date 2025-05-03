import { apiSlice } from "../api/apiSlice";

interface WeatherResponse {
  // Define properties based on API response (example below)
  name: string;
  id: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
  };
}

export const weatherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWeather: builder.query<WeatherResponse, string>({
      query: (city: string) => ({
        url: "weather",
        method: "GET",
        params: {
          q: city,
          appid: import.meta.env.VITE_APP_API_KEY,
        },
      }),
    }),
  }),
});

export const { useFetchWeatherQuery } = weatherApi;
