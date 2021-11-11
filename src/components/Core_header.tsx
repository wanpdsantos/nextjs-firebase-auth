import { Button, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{ display: `flex`, justifyContent: `space-between` }}
          >
            NEXTJs Firebase Authentication
          </Container>
          <Link href='/signIn'>
            <Button variant="outlined" color='secondary' startIcon={<PersonIcon />}>
              Sign In
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Box height='5em'></Box>
    </>
  );
};

export default Header;