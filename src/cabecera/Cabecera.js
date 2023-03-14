
  import * as React from 'react';
  import AppBar from '@mui/material/AppBar';
  import Box from '@mui/material/Box';
  import Toolbar from '@mui/material/Toolbar';
  import Typography from '@mui/material/Typography';
  import Button from '@mui/material/Button';
  import IconButton from '@mui/material/IconButton';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Cabecera(props) {
    const navigate = props.nav;
    return (
        <ButtonAppBar title="PyRobots" onBackClick={() => navigate("/")} />
    );
  }


function ButtonAppBar(props) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={props.onBackClick}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
            <Button color="inherit"></Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  
export default Cabecera;
