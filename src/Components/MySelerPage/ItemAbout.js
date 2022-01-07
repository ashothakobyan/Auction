import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({setAbout}) {
  return (
    <Box 
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={(e)=>setAbout(e.target.value)}  multiline
          rows={3}  id="outlined-basic" label="Desciption" variant="outlined" />
    </Box>
  );
}