import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";

import { initialState, setAuth, setUser } from '../Redux/Slicder';
import Drawer from "./Drawer"
import { Avatar } from '@mui/material';






export default function ButtonAppBar() {
  const auth = getAuth()
  const dispatch = useDispatch()
  const navigateLink = useNavigate()
  const email = useSelector((state) => state.auction.user.email)
  const IsAuth = useSelector((state) => state.auction.user.isAuth)
  const name = useSelector((state) => state.auction.user.name)
  const surname = useSelector((state) => state.auction.user.surName)
  const signout = async (str) => {

    await signOut(auth).then(() => {
     console.log(444)
      dispatch(setAuth())
      navigateLink(str)
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }



  return (
    <>
      <Box style={{marginBottom:20}} sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Drawer />
            </IconButton>
            <Avatar style={{
             
            }}  src="/broken-image.jpg" />
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
              
              
            </Typography>
            {
              
              IsAuth ?

                <>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {`   ${name}  ${surname}`}
                  </Typography>
                  <Button color='warning' onClick={() => signout("/")}>Log out </Button>
                </>

                :
                <>
                  <Button color='warning' onClick={() => navigateLink("/signInForBuyer")}>Sign In </Button>
                  <Button color='warning' onClick={() => navigateLink("/signUpForBuyer")}>Sign Up </Button>
                </>
            }


          </Toolbar>
        </AppBar>

      </Box>



      {/* {
          liveDrow === "MySelerPage"?<MySelerPage />:null
        } */}





    </>


  )
}
