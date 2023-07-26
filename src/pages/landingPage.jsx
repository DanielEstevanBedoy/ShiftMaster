import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();





export default function Album() {
  return (


    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
  
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            minHeight: '80vh',
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Welcome to ShiftMaster

            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              An organized, intuitive, shift schedule for your companies. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Link to ="/signin">
              <Button  variant="contained"> Log In </Button>
                </Link>
                <Link to ="/signup">
              <Button variant="outlined">SignUp</Button>
              </Link>
            </Stack>
          </Container>
        </Box>

      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Interested in the souce code?
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Check out this project on Github!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}