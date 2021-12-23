import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../Redux/Slicder';
import NavigationBar from "./NavigationBar";

import { collection, getDocs } from 'firebase/firestore/lite';
import { db, getUsers } from '../firebais/fiarebaisForBuyers';


export default function MediaCard() {
    let { uid, email, name, surName } = useSelector((state) => state.auction.user);


    return (
        <div>
            <NavigationBar />
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="240"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="User"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">

                        {name + " " + surName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You have 0 purchase and 0 sales
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => getUsers(db)} size="small">My purchase</Button>
                    <Button size="small">My sales</Button>
                </CardActions>
            </Card>
        </div>
    );
}