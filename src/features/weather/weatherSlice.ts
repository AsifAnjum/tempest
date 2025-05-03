import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface weatherState {
  searchedCities: {
    id: number;
    city: string;
  }[];
  maxCities: number;
}

const initialState: weatherState = {
  searchedCities: [],
  maxCities: 5,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addSearchedCity: (
      state,
      action: PayloadAction<{ id: number; city: string }>
    ) => {
      const isCityAlreadySearched = state.searchedCities.some(
        (c) => c.city === action.payload.city
      );

      if (isCityAlreadySearched) {
        // if the city is exist in the list, removed && added to the end of the list
        state.searchedCities = state.searchedCities.filter(
          (c) => c.city !== action.payload.city
        );
        state.searchedCities.unshift(action.payload);
      } else {
        if (state.searchedCities.length >= state.maxCities) {
          state.searchedCities.shift(); // Removed the oldest city
        }
        state.searchedCities.unshift(action.payload);
      }
    },
    removeSearchedCity: (state, action: PayloadAction<number>) => {
      state.searchedCities = state.searchedCities.filter(
        (c) => c.id !== action.payload
      );
    },
    clearSearchedCities: (state) => {
      state.searchedCities = [];
    },
  },
});

export const { addSearchedCity, clearSearchedCities, removeSearchedCity } =
  weatherSlice.actions;

export default weatherSlice.reducer;
