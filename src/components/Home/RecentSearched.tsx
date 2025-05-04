import {
  clearSearchedCities,
  removeSearchedCity,
} from "../../features/weather/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { ClockIcon } from "../icons/clockIcon";
import { MapPinIcon } from "../icons/mapPinIcon";

interface RecentSearchedProps {
  onSearch: (query: string) => void;
}

export const RecentSearched = ({ onSearch }: RecentSearchedProps) => {
  const { searchedCities } = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  let content;

  if (searchedCities.length === 0) {
    content = (
      <div className="text-center py-12">
        <p className="text-center text-slate-500 dark:text-slate-400">
          No recent searches found.
        </p>
      </div>
    );
  } else {
    content = (
      <ul className="divide-y divide-border">
        {searchedCities.map((city) => (
          <li
            key={city.id}
            className="py-4 hover:bg-muted/50 group transition-colors"
          >
            <div className="flex justify-between items-center">
              <button
                className="w-full hover:bg-transparent flex  items-center gap-10"
                onClick={() => onSearch(city.city)}
              >
                <MapPinIcon className="size-5" />
                <span>{city.city}</span>
              </button>

              <button
                onClick={() => dispatch(removeSearchedCity(city.id))}
                className="text-red-400 transition-colors duration-200 hidden group-hover:block"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="dark:bg-slate-900 bg-blue-100/40 border border-slate-300 dark:border-slate-700 dark:text-white rounded-lg shadow-xl p-4 mt-4">
      <div>
        <div className="text-lg flex items-center justify-between">
          <div>
            <ClockIcon className="size-5 inline" />
            <span className="ml-2 font-semibold">Recent Searches</span>
          </div>
          <button
            onClick={() => dispatch(clearSearchedCities())}
            className="text-[15px] font-semibold text-red-500 hover:text-red-600 transition-colors duration-200 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={searchedCities.length === 0}
          >
            Clear
          </button>
        </div>
      </div>

      {content}
    </div>
  );
};
