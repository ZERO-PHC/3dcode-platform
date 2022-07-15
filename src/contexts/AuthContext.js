import * as fcl from "@onflow/fcl";
import { createContext, useContext, useEffect, useState } from "react";

import "../flow/config";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  const [FlowBalance, setFlowBalance] = useState(0);
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  useEffect(() => {
    getAccountObj();
  }, [user]);

  const getAccountObj = async () => {
    // so let's add some basic protection here
    if (user?.addr) {
      const account = await fcl.account(user.addr);
      console.log("accountInfo", account.balance);
      setFlowBalance(account.balance / Math.pow(10, 8));
    }
  };

  // create  checkFlowBalance function
  const checkFlowBalance = async (price) => {
    const account = await fcl.account(user.addr);
    const balance = account.balance / Math.pow(10, 8);
    if (balance < price) {
      return false;
    } else {
      return true;
    }
  };

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
    FlowBalance,
    getAccountObj,
    checkFlowBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
