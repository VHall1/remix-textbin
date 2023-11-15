import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import * as React from "react";
import type { Theme } from "./utils";

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<ThemeProviderProps>) {
  const persistTheme: FetcherWithComponents<any> = useFetcher();
  const [themeInState, setThemeInState] = React.useState<Theme>(theme);

  const contextValue = React.useMemo(() => {
    const setTheme = (prefers: Theme) => {
      persistTheme.submit(
        { theme: prefers },
        { action: "actions/set-theme", method: "post" }
      );

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

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeContextType {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  theme: Theme;
}
