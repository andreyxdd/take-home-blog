/* eslint-disable global-require */
import React from 'react';
import { UserProps } from '../types';
import { getUser } from '../services/auth';

export type IUserContext ={
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>> | (() => void);
  userWantsSignIn: boolean;
  setUserWantsSignIn: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  isLoading: boolean;
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  setUser: () => ({}),
  userWantsSignIn: true,
  setUserWantsSignIn: () => ({}),
  isLoading: true,
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProps | null>(null);
  const [userWantsSignIn, setUserWantsSignIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load any resources or data that we need prior to loading the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setIsLoading(true);
        const fetchedUser = await getUser();
        setUser(fetchedUser);

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((r) => setTimeout(r, 1100)); // sleep 1.1 sec for better UX
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const value = React.useMemo(() => ({
    user, setUser, isLoading, userWantsSignIn, setUserWantsSignIn,
  }), [user, isLoading, userWantsSignIn]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
