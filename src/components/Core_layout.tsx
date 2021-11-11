import Head from 'next/head';
import Box from '@mui/material/Box';

interface LayoutProps {
  children: any;
  title: string;
}

export default function CORE_Layout ({children, title}:LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='initial-scale=1, width=device-width'/>
      </Head>

      <Box sx={{
        backgroundColor: 'primary',
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
        width:'100vw'
      }}>
        {children}
      </Box>
    </>
  );
};