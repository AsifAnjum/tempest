import useTheme from "../../hooks/useTheme";
import { MoonIcon } from "../icons/moonIcon";
import { SunIcon } from "../icons/sunIcon";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-sky-700 dark:text-sky-400 mb-2">
          Weather Forecast
        </h1>
        <button onClick={() => toggleTheme()} className="theme-button">
          {theme === "light" ? (
            <MoonIcon className="text-slate-200" />
          ) : (
            <SunIcon className="text-yellow-400" />
          )}
        </button>
      </div>
    </div>
  );
};
