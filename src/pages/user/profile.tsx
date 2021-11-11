import { Button, Typography } from "@mui/material";
import Header from "../../components/Core_header";
import CORE_Layout from "../../components/Core_layout";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useRouter } from 'next/router';
import CORE_Alert from "../../components/Core_alert";
import { useState } from "react";

const ProfilePage = () => {
  const [AlertMsg, setAlertMsg] = useState({title:'',severity:'',message:''});
  const { authUser, signOutUser }:any = useFirebaseAuth();
  const router = useRouter();

  if (!authUser) {
    return (
      <CORE_Layout title={'Blocked'}>
        <Header/>
        <Typography variant='h1'>Please Sign In to access this page.</Typography>
      </CORE_Layout>
    );
  };

  const SignOut = async () => {
    const singOut = await signOutUser();
    if (singOut.error) {
      setAlertMsg({title:'Login Error',severity:'error',message:singOut.errorMsg})
    }
  }

  return (
    <CORE_Layout title={'Profile Page'}>
      <CORE_Alert data={AlertMsg}/>
      <Header/>
      <Typography variant='h5'>Welcome, {authUser.email}</Typography>
      {authUser?
        <Button onClick={SignOut}>
          Sign Out
        </Button>
        :<></>
      }
    </CORE_Layout>
  );
};

export default ProfilePage;