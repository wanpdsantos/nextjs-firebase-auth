import { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInEmailAndPassword = async (email:string, password:string) => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/user/profile');
      return {error:false, errorMsg: ''}
    } catch(err:any) {
      return {error:true, errorMsg: err.message}
    }
  }

  const signOutUser = async () => {
    try{
      await signOut(auth);
      clear();
      router.push('/');
      return {error:false, errorMsg: ''}
    } catch (err:any) {
      return {error:true, errorMsg: err.message}
    }
  }
    
  const authStateChanged = async (authState:any) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }
    setLoading(true)
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);    
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, [auth]);

  return {
    authUser,
    loading,
    signInEmailAndPassword,
    signOutUser
  };
}