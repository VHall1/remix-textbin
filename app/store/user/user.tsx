import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import * as React from "react";
import type { User } from "@prisma/client";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  user: User | null;
}

function UserProvider({
  children,
  user = null,
}: React.PropsWithChildren<UserProviderProps>) {
  const persistUser: FetcherWithComponents<any> = useFetcher();
  const [userInState, setUserInState] = React.useState<User | null>(user);

  const ctx = React.useMemo(() => {
    const setUser = (user: User | null) => {
      persistUser.submit({ user }, { action: "actions/login", method: "post" });
      setUserInState(user);
    };

    return { user: userInState, setUser };
  }, [userInState, persistUser]);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}

function useUser() {
  const ctx = React.useContext(UserContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
}

export { UserContext, UserProvider, useUser };
