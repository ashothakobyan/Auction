import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { addBuyer, auth, createUserForBuyer, db, getUsers } from "../firebais/fiarebaisForBuyers"
import { useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { setUser } from "../Redux/Slicder"
import { useDispatch } from "react-redux"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch  = useDispatch()








  onAuthStateChanged(auth, (user) => {
    if (user) {

      const ourusersInfo = () => getUsers(db);
      const asd = ourusersInfo();
      asd.then(function (resolve) {
        const usersInfo = resolve;
        const currentUser = usersInfo.find((userInfo) => userInfo.email === user.email);
        dispatch(setUser(
          {
            email: user.email,
            uid: user.uid,
            name: currentUser.name,
            surName: currentUser.surName,
            balance: currentUser.balance,
            items: currentUser.myItems,
          }
        ))
      })

      navigate("/")

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



   const handleSubmit = async(event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("firstName"),
      surName: data.get("lastName"),
    }

     

    await createUserForBuyer(user.email, user.password)
    

         addBuyer(user.name, user.surName, user.email,)
       
       dispatch(setUser({
         payload:{
           name:user.name,
           surName:user.surName,
           email:user.email,
          //  id:currenntUser.id,
           balance:100000
         }
       }))
       navigate("/")

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signInForBuyer" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
