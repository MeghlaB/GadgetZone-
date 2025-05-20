import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);


const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // CreateUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // user-SignIn user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user-logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // updatephoto
  const updateUserprofile =(name,photo)=>{
    return updateProfile(auth.currentUser,{
      displayName:name ,photoURL:photo
    })

  }
  // Google_login
  const GoogleLogin =()=>{
    setLoading(true)
    return signInWithPopup(auth,provider)
  }

  // onAuthStateChanged
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setUser(currentUser);
     //console.log('Current-user =>',currentUser)
     
    // if (currentUser) {
    //   setUser(currentUser);

    //   const userInfo = { email: currentUser.email };
    //   axiosPublic.post("/jwt", userInfo)
    //     .then((res) => {
    //       if (res.data.token) {
    //         localStorage.setItem("access-token", res.data.token);
    //       }
    //       setIsLoading(false); // ✅ এখানে রাখো
    //     })
    //     .catch(() => {
    //       setIsLoading(false); // 🛑 error হলেও loading বন্ধ হওয়া দরকার
    //     });
    // } else {
    //   setUser(null);
    //   localStorage.removeItem("access-token");
    //   setIsLoading(false);
    // }
  });

  return () => unsubscribe();
}, []);


 
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserprofile ,
    GoogleLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    {/* {loading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-accent bg-opacity-50">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    ) : (
      children
    )} */}
  </AuthContext.Provider>
  );
}

export default AuthProvider;
