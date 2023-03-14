import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CargaCircular() {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            margin: '0px 0px 20px'
        }} >
            <CircularProgress />
        </Box>
    );
}
