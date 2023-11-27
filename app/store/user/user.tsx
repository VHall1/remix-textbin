import type { User } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import * as React from "react";

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  logout: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  user: UserContextType["user"];
}

function UserProvider({
  children,
  user = undefined,
}: React.PropsWithChildren<UserProviderProps>) {
  const fetcher = useFetcher();
  const [userInState, setUserInState] =
    React.useState<UserContextType["user"]>(user);

  const handleLogout = () => {
    fetcher.submit({}, { action: "logout", method: "post" });
    setUserInState(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        user: userInState,
        setUser: setUserInState,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const ctx = React.useContext(UserContext);
  if (ctx === undefined) {
    throw new Error("useUser hook must be used within a UserProvider");
  }
  return ctx;
}

export { UserContext, UserProvider, useUser };
