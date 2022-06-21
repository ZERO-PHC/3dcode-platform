import * as fcl from "@onflow/fcl";
import { createContext, useContext, useEffect, useState } from "react";

import "../flow/config";

import { useNFTs } from "./NftsContext";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

  const [user, setUser] = useState({ loggedIn: false, addr: undefined });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
  };

  const logIn = async () => {
    const res = await fcl.authenticate();
  };

  const signUp = () => {
    fcl.signUp();
  };

  const value = {
    logOut,
    logIn,
    signUp,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
