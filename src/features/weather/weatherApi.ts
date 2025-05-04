import { apiSlice } from "../api/apiSlice";

export interface WeatherResponse {
  // Define properties based on API response (example below)
  name: string;
  id: number;
  cod: number | string;
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
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
}

export interface ForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
  }[];
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
    fetchForecast: builder.query<
      ForecastResponse,
      { lat: number; lon: number }
    >({
      query: ({ lat, lon }: { lat: number; lon: number }) => ({
        url: "forecast",
        method: "GET",
        params: {
          lat: lat,
          lon: lon,
          appid: import.meta.env.VITE_APP_API_KEY,
        },
      }),
    }),
  }),
});

export const { useLazyFetchWeatherQuery, useFetchForecastQuery } = weatherApi;
