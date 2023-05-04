/* eslint-disable global-require */
import React from 'react';
import { UserProps } from '../types';
import { getUser } from '../services/auth';

export type IUserContext ={
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>> | (() => void);
  isUserContextReady: boolean;
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  setUser: () => ({}),
  isUserContextReady: false,
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProps | null>(null);
  const [isUserContextReady, setIsUserContextReady] = React.useState(false);

  // Load any resources or data that we need prior to loading the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((r) => setTimeout(r, 1100)); // sleep 1.1 sec for better UX
      } catch (e) {
        console.warn(e);
      } finally {
        setIsUserContextReady(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const value = React.useMemo(() => ({
    user, setUser, isUserContextReady,
  }), [user, setUser, isUserContextReady]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
