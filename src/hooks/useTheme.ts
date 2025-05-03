import { use } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
