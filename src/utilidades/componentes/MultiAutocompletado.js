import { Autocomplete, TextField } from "@mui/material";

export default function MultiAutocompletado(props) {
    const { lista, name, value, label, placeholder, onChange, error, helperText } = props
    return (
        <Autocomplete
            value={value}
            onChange={(event, value) => {
                // Prevenir que el usuario escriba cualquier cosa (por freeSolo)
                if (!value.some((element) => typeof element === 'string')) {
                    onChange({ target: { name, value } });
                }
            }}
            multiple
            options={lista}
            getOptionLabel={(opcion) => opcion.nombre}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    fullWidth
                />
            )}
            // Permitir que se elija muchas veces el mismo robot
            isOptionEqualToValue={() => false}
            freeSolo={true}
        />
    );
}
