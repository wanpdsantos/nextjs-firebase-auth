import { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

const formatAuthUser = (user:any) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInEmailAndPassword = (email:string, password:string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('justUser: ', user);
      setAuthUser({uid: userCredential.user, email: userCredential.user});
    })
    .catch((error:any) => {
      console.log('Error: ',error.code , 'Message: ', error.message)
    });
  }

  const createUserEmailAndPassword = (email:string, password:string) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error:any) => {
      console.log('Error: ',error.code , 'Message: ', error.message)
    });
  }
    
  const signOut = () => {
    auth.signOut().then(clear);
  }
    
  const authStateChanged = async (authState:any) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    const formattedUser = formatAuthUser(authState);
    console.log('formtedUser: ', formattedUser);
    setAuthUser(formattedUser);    
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInEmailAndPassword,
    signOut
  };
}