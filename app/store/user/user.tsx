import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import * as React from "react";
import type { User } from "@prisma/client";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface ThemeProviderProps {
  user: User;
}

export function ThemeProvider({
  children,
  user,
}: React.PropsWithChildren<ThemeProviderProps>) {
  const persistTheme: FetcherWithComponents<any> = useFetcher();
  const [userInState, setUserInState] = React.useState<User>(user);

  const contextValue = React.useMemo(() => {
    const setUser = (user: User) => {
      persistTheme.submit(
        { theme: prefers },
        { action: "actions/set-theme", method: "post" }
      );

      setThemeInState(prefers);
    };

    return { theme: themeInState, setTheme };
  }, [themeInState, persistTheme]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const ctx = React.useContext(UserContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
}

export { UserContext };
