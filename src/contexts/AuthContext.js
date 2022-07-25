import * as fcl from "@onflow/fcl";
import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import "../flow/config";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [FirestoreUser, setFirestoreUser] = useState(null);
  const [Coins, setCoins] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log({ user });
      } else {
        setUser(null);
        console.log("no user");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.email);
      const unsub = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists) {
          const userObj = snapshot.data();
          console.log("userObj", userObj);
          setFirestoreUser(userObj);
          setCoins(userObj.coins);
        }
      });
      return () => {
        // clean up the listener
        unsub();
      };
    }
  }, [user]);

  const provider = new GoogleAuthProvider();
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        createFirestoreUser(user);
        console.log({ credential, token, user });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  // create createFirestoreUser function
  const createFirestoreUser = async (user) => {
    const userRef = doc(db, "users", user.email);
    // const userDoc = await userRef.get();
    // if (!userDoc.exists) {
    const userObj = {
      // name: user.displayName,
      email: user.email,
      coins: 0,
      // photoURL: user.photoURL,
      uid: user.uid,
      createdAt: new Date(),
    };
    await setDoc(userRef, userObj);
    // }
  };

  // get the user's account object from firestore

  // const getAccountObj = async () => {
  //   if (user) {
  //     // get the userDoc in realtime onSnapshot
  //     userRef.onSnapshot((userDoc) => {

  //     });
  //   }

  //   // setFirestoreUser(userDoc);
  //   // console.log("userDoc", userDoc);
  //   // setCoins(userDoc.data().coins);
  // };

  const logout = () => {
    auth.signOut();
    console.log("logout");
  };

  // const logOut = async () => {
  //   await fcl.unauthenticate();
  //   setUser({ addr: undefined, loggedIn: false });
  // };

  // const logIn = async () => {
  //   const res = await fcl.authenticate();
  // };

  const signUp = () => {
    fcl.signUp();
  };

  const value = {
    logout,
    login,
    signUp,
    user,
    Coins,
    FirestoreUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
