import { Box, Stack} from "@mui/material";
import React from "react";

import CargaCircular from "../../utilidades/CargaCircular";

function Tablero(props) {
    const [estado] = React.useState({ creando: false})

    const tiles = props.tiles
    const tileSize = props.tile

    const mapa = Array.from({ length: tiles }, (_, index) => {
        return <Stack direction={"row"} key={index}>
            {Array.from({ length: tiles }, (_, i) => {
                return <Box key={i}
                    sx={{
                        height: tileSize - 2,
                        width: tileSize - 2,
                        fontSize: '8px',
                        color: '#555555',
                        border: 1,
                        borderColor: '#dddddd',
                        overflow: 'hidden'
                    }}>
                    {i === 0
                        ? index*50
                        : <> </>
                    }<br/><br/>
                    {index === tiles-1
                        ? i*50
                        : <> </>
                    }
                </Box>
            })}
        </Stack>
    })

    const tablero =
        <Box 
            style={{...props.style}}
            sx={{ 
                height: tiles * (tileSize), 
                width: tiles * (tileSize),
                border: 1, 
                borderColor: 'primary.main' }}>
            <Box>
                {mapa}
            </Box>
        </Box>


    return (
        <>
            {estado.creando ? <CargaCircular /> : tablero}
        </>
    );
}
  

export default Tablero;




