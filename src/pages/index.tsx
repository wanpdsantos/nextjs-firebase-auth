import { Typography } from "@mui/material";
import Header from "../components/Core_header";
import CORE_Layout from "../components/Core_layout";

const Homepage = () => {
  return (
    <CORE_Layout title={'Home Page'}>
      <Header/>
      <Typography variant='h1'>Home Page</Typography>
      <Typography variant='body1'>Random text to test if the responsive font is working according to the config done to the theme file!</Typography>
    </CORE_Layout>
  );
};

export default Homepage;