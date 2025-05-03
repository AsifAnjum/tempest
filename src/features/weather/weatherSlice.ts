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
        state.searchedCities.push(action.payload);
      } else {
        if (state.searchedCities.length >= state.maxCities) {
          state.searchedCities.shift(); // Removed the oldest city
        }
        state.searchedCities.push(action.payload);
      }
    },
  },
});

export const { addSearchedCity } = weatherSlice.actions;

export default weatherSlice.reducer;
