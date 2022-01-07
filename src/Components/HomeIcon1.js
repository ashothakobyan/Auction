import * as React from 'react';
import Box from '@mui/material/Box';
import { createSvgIcon } from '@mui/material/utils';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

export default function HomeIcon1({item,live}) {
  return (
    <Box
    
    style={{
        position:"absolute",
        display:"flex",
        left:0,
        rigth:0,
        bottom:0,
        justifyContent:"space-between",
        height:"50px"
    }}
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
        <h4>{item.itemName}</h4>
        <div style={{
            display:"flex"
        }}>
            {live && <h4>Live</h4>}
            <FiberManualRecordIcon  sx={{ color: live? '#d50000':null }} />


        </div>


    </Box>
  );
}
