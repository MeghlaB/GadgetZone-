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

import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);


const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const axiosPublic = UseAxiosPublic()
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

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
     setuser(currentUser);
     console.log('Current-user =>',currentUser)
     
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
}, [axiosPublic]);


 

  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setIsLoading(false)
  //     if (currentUser) {

  //       setUser(currentUser);
  //       // get token and store client
  //       const userInfo = { email: currentUser.email }
  //       axiosPublic.post('/jwt', userInfo)
  //         .then(res => {
  //           // console.log(res.data)
  //           if (res.data.token) {
  //             setIsLoading(false)
  //             localStorage.setItem('access-token', res.data.token)
  //           }
  //         })
  //     }
  //     else {
  //       // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
  //       setIsLoading(false)
  //       localStorage.removeItem('access-token');
  //     }
  //     // console.log('Current User ==>', currentUser);
  //     setIsLoading(false)
  //   });

  //   // Cleanup function for onAuthStateChanged
  //   return () => unsubscribe();
  // }, [axiosPublic]);
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
    {loading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-accent bg-opacity-50">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    ) : (
      children
    )}
  </AuthContext.Provider>
  );
}

export default AuthProvider;
