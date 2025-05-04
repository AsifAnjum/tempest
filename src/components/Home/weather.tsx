import { useEffect, useState } from "react";
import { flags, FlagType } from "../../assets/flags";
import { WeatherResponse } from "../../features/weather/weatherApi";
import {
  dateString,
  formatTimezone,
  kelvinToCelsius,
  msToKmh,
} from "../../lib/util";
import { CalenderIcon } from "../icons/calenderIcon";
import { ClockIcon } from "../icons/clockIcon";
import { DropletsIcon } from "../icons/dropletsIcon";
import { MapPinIcon } from "../icons/mapPinIcon";

import { ThermometerIcon } from "../icons/thermometerIcon";
import { WindIcon } from "../icons/windIcon";
import { Forecast } from "./Forecast";

export const Weather = ({ data }: { data: WeatherResponse }) => {
  const [isShowForecast, setIsShowForecast] = useState(false);
  const flag = flags[data.sys.country as FlagType];

  useEffect(() => {
    setIsShowForecast(false);
  }, [data]);

  let forecastContent;
  if (!isShowForecast) {
    forecastContent = (
      <button
        onClick={() => setIsShowForecast(true)}
        className="flex bg-indigo-400 p-2 rounded-lg mx-auto"
      >
        <CalenderIcon className="mr-2 text-[#c8ced3]" />
        <span className="text-slate-300">Show Forecast</span>
      </button>
    );
  } else {
    forecastContent = (
      <Forecast
        lat={data.coord.lat}
        lon={data.coord.lon}
        isShowForecast={isShowForecast}
      />
    );
  }

  return (
    <>
      <figure className="flex justify-center mb-4">
        <img src={flag} alt="" className="size-56" />
      </figure>

      <div className="mb-8">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold flex items-center">
                <MapPinIcon className="mr-2 size-24" />
                {data?.name}
              </h2>
              <p className="text-sky-100 mt-1">{dateString(data.dt)}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">
                {kelvinToCelsius(data.main.temp)}°C
              </div>
              <div className="flex items-center justify-end mt-2">
                <p className="text-xl font-bold italic">
                  {data?.weather[0].main}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid dark:bg-[#0f3357] bg-[#b1cae7] rounded-b-lg grid-cols-2 md:grid-cols-4 gap-4 p-6 dark:text-slate-300">
          <div className="flex items-center">
            <ThermometerIcon className="mr-2 text-orange-500" />
            <div>
              <p className="text-sm dark:text-slate-400">Feels Like</p>
              <p className="font-semibold">
                {kelvinToCelsius(data.main.feels_like)} °C
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <WindIcon className="mr-2 text-blue-500" />
            <div>
              <p className="text-sm dark:text-slate-400">Wind Speed</p>
              <p className="font-semibold">{msToKmh(data.wind.speed)} km/h</p>
            </div>
          </div>
          <div className="flex items-center">
            <DropletsIcon className="mr-2 text-cyan-500" />
            <div>
              <p className="text-sm dark:text-slate-400">Humidity</p>
              <p className="font-semibold">{data?.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 dark:text-blue-400 text-sky-500" />
            <div>
              <p className="text-sm dark:text-slate-400">Time Zone</p>
              <p className="font-semibold">{formatTimezone(data.timezone)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* forecastContent */}
      {forecastContent}
    </>
  );
};
