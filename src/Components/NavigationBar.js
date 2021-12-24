import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { store } from '../Redux/Store';
import { initialState, setUser } from '../Redux/Slicder';
import Drawer from "./Drawer"

import { db, getUsers } from '../firebais/fiarebaisForBuyers';





export default function ButtonAppBar() {
  const auth = getAuth()
  const dispatch = useDispatch()
  const navigateLink = useNavigate()
  const liveDrow = useSelector((state) => state.auction.liveDrow)
  const sta = useSelector((state) => state)

  const arr = [1, 2, 3, 4, 5, 6, 7, 8]


  const uid = useSelector((state) => state.auction.user.uid)
  const email = useSelector((state) => state.auction.user.email)

  const  signout = async (str) => {
    
    await signOut(auth).then(() => {
      dispatch(setUser(
        initialState
      ))
      navigateLink(str)
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }


  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(!email){
        const ourusersInfo = () => getUsers(db);
        const asd = ourusersInfo();
        asd.then(function (resolve) {
          const usersInfo = resolve;
          
          const currentUser = usersInfo.find((userInfo) => userInfo.email === user.email);
          console.log(currentUser)
          dispatch(setUser(
            {
              email: user.email,
              uid: user.uid,
              name: currentUser.name,
              surName: currentUser.surName,
              balance: currentUser.balance,
              items: currentUser.myItems,
              referance:currentUser.reference
            }
          ))
        })
      }


      // const userInfo = usersInfo.find((userInfo) => userInfo.email === user.email)
      // console.log(userInfo);

      // uid = user.uid;
      // const name = user.name
      // email = user.email
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

 




  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {
              uid ?
                <>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {email}
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
