import { useEffect } from "react";
import "./App.css";
import { useFetchWeatherQuery } from "./features/weather/weatherApi";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { addSearchedCity } from "./features/weather/weatherSlice";
import { FlagType, flags } from "./assets/flags";

function App() {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.searchedCities);

  const { data, isLoading, isError, isSuccess } =
    useFetchWeatherQuery("khulna");

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error</div>;
  }

  if (data) {
    const flag = flags[data.sys.country as FlagType];
    content = (
      <div className="flex justify-between items-center">
        <div>
          <img
            src={flag}
            alt={data.sys.country}
            title={data.sys.country}
            width={300}
          />
          <h1>City:{data.name}</h1>
          <p>Weather:{data.weather[0].main}</p>
          <p>Wind: {data.wind.speed}</p>
        </div>

        <div className="space-y-2 border-2 border-gray-300 p-4 rounded-lg">
          <h1>Saved Cities</h1>
          <ul>
            {cities.map((city) => (
              <li key={city.id} className="italic font-bold">
                {city.city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addSearchedCity({ id: data.id, city: data.name }));
    }
  }, [data, isSuccess, dispatch]);

  return content;
}

export default App;
