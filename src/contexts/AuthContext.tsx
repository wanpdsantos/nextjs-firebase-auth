import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInEmailAndPassword: async () => {},
  signOut: async () => {}
});

export function AuthUserProvider({ children }:any) {
  const auth = useFirebaseAuth();
  //@ts-ignore
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);