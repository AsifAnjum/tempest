import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      console.log("Something went wrong:");
    }
    if (result.error?.status === 429) {
      console.log("Rate limit exceeded.");
    }

    if (result.error?.status === "FETCH_ERROR") {
      console.log("Network error. Please check your connection.");
    }

    return result;
  },
  endpoints: () => ({}),
});
