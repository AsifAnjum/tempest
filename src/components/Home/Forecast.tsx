import { useFetchForecastQuery } from "../../features/weather/weatherApi";
import { dateString, kelvinToCelsius } from "../../lib/util";
import { NotFound } from "../ui/NotFound";
import { Skeleton } from "../ui/Skeleton";

interface ForecastProps {
  lat: number;
  lon: number;
  isShowForecast?: boolean;
}

export const Forecast = ({ lat, lon, isShowForecast }: ForecastProps) => {
  const { data, isError, isLoading } = useFetchForecastQuery(
    {
      lat,
      lon,
    },
    {
      skip: !isShowForecast,
    }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 max-sm:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="size-64" />
        ))}
      </div>
    );
  }
  if (isError) {
    return <NotFound message="Forecast Not Available" />;
  }

  if (!data) {
    return <div className="text-center">No forecast data available</div>;
  }

  return (
    <div className="">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        Forecast
      </h3>
      <div className="grid grid-cols-1 max-sm:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {data.list.map((d, index) => {
          return (
            <div
              key={index}
              className="shadow-md bg-[#c9dfdbda] max-sm:w-full dark:bg-inherit dark:border dark:border-slate-600 p-2 dark:text-slate-200"
            >
              <div className="text-center text-lg">
                {dateString(d.dt, true)}
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                width={80}
                className="mx-auto"
              />
              <div className="text-center ">
                <div className="text-slate-600 dark:text-slate-300 mb-2">
                  {d.weather[0].main}
                </div>
                <div className="flex justify-center gap-3 text-sm font-medium">
                  <span className="text-slate-900 dark:text-white">
                    {kelvinToCelsius(d.main.temp)}°
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
