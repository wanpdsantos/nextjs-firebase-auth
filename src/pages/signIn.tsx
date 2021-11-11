import React, { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from '@mui/material/Typography';
import CORE_Layout from '../components/Core_layout';
import CORE_Alert from '../components/Core_alert';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        WANDERSON P.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignInScreen = () => {
  const [AlertMsg, setAlertMsg] = useState({title:'',severity:'',message:''});
  const { signInEmailAndPassword }:any = useFirebaseAuth();

  const login = async (event:any) => {
    event.preventDefault();
    const login = await signInEmailAndPassword(event.target[0].value, event.target[2].value);
    if (login.error) {
      setAlertMsg({title:'Login Error',severity:'error',message:login.errorMsg})
    }
  };
  
  return (
    <CORE_Layout title='Sign In'>
      <CORE_Alert data={AlertMsg} />
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Box sx={{    
          marginTop:'2em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form style={{width:'100%'}} onSubmit={login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Autenticar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a Senha ?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Box>
    </CORE_Layout>
  );
}

export default SignInScreen;