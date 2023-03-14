import * as React from 'react';
import { Box, Paper } from '@mui/material/';

export default function CajaDeCrearPartida(props) {
    const Style = { height: '100%', width: '80%', padding: '2%'};
    return (
        <Box sx={{ 
            display: "flex",
            justifyContent: "center",
            verticalAlign: "center",
            textAlign: "center",
            }}
        >
            <Paper elevation={10} style={Style}>
                {props.children}
            </Paper>
        </Box>
    );
}
