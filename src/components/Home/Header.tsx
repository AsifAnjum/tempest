import useTheme from "../../hooks/useTheme";
import { MoonIcon } from "../icons/moonIcon";
import { SunIcon } from "../icons/sunIcon";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-sky-700 dark:text-sky-400 mb-2">
          Weather Forecast
        </h1>
        <button
          onClick={() => toggleTheme()}
          className="ml-4 p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          aria-label="Toggle dark mode"
        >
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
