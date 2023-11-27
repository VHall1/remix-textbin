import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import * as React from "react";
import type { Theme } from "./util";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  theme: Theme;
}

function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<ThemeProviderProps>) {
  // Fine to leave this untyped. Not really reading data from the response
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

function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme hook must be used within a ThemeProvider");
  }
  return ctx;
}

export { ThemeContext, ThemeProvider, useTheme };
