import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { Theme } from "./utils";

// ThemeContext
type ThemeContextType = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme;
};

// ThemeProvider
function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const persistTheme: FetcherWithComponents<any> = useFetcher();
  const [themeInState, setThemeInState] = useState<Theme>(theme);

  const contextValue = useMemo(() => {
    const setTheme = (prefers: Theme) => {
      persistTheme.submit(
        { theme: prefers },
        { action: "actions/set-theme", method: "post" }
      );

      // Then trigger the state change and theme session cookie change via fetcher
      setThemeInState(prefers);
    };
    return { theme: themeInState, setTheme };
  }, [themeInState, persistTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook helper useTheme
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { Theme, ThemeProvider, useTheme };
