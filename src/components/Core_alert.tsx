import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function CORE_Alert({ data }:any) {
  const[AlertMsg, setAlertMsg] = React.useState(false);
  useEffect(()=>{
    if (data.severity !== undefined) {
      setAlertMsg(true);
    };
  },[data]);

  return (
    <Snackbar open={AlertMsg} autoHideDuration={6000} onClose={() => {setAlertMsg(false)}}>
      <Alert severity={data.severity} onClose={() => {setAlertMsg(false)}}>
        <AlertTitle>{data.title}</AlertTitle>
        {data.message}
      </Alert>
    </Snackbar>
  );
}