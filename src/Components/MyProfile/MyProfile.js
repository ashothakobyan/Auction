import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import NavigationBar from "../NavigationBar";
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../../firebais/fiarebaisForBuyers';
import MyPurchase from './MyPurchase';
import UploadImgForUser from './UploadImgForUSer';
import MySales from './MySales';


export default function UserItem() {

    let {email, name, surName,myBougthItems,userImg} = useSelector((state) => state.auction.user);
    const[myPurchaseItems,setMyPurchaseItems] = React.useState([])


    const fetchBlogs = React.useCallback(async (db, e) => {
        const response = collection(db, 'AuctionItems');
        const resItems = query(response, where("owner", "==", e))
        const data = await getDocs(resItems);
        const auctionAllItems = data.docs.map(item => {
            return item.data()
        })
        const ownerRef = await Promise.all(auctionAllItems.map(async (item) => {
            const ownerData = await getDoc(item.buyerUser)
            return {
                ownerData: ownerData.data(),
                ...item
            }
        }))

        setMyPurchaseItems(ownerRef);
    }, [])


    React.useEffect(() => {
        if (email) {
            fetchBlogs(db, email)
        }
    }, [email, fetchBlogs])

    return (
        <div>

            <NavigationBar />
         <div className='my-profile-content'>
         <Card sx={{ maxWidth: 345 }}>
                <div>
                    <CardMedia 
                        style={{
                            borderRadius: "50%"
                        }}
                        component="img"
                        image={userImg || "https://firebasestorage.googleapis.com/v0/b/auction-44e7c.appspot.com/o/usersImgs%2FuserImg.png?alt=media&token=3fe49da6-c47c-45b6-a239-2fffe2f5511a"}
                        alt="User"
                    />
                    <UploadImgForUser />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${name} ${surName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You have {myPurchaseItems?.length} purchase and {myBougthItems?.length} sales
                    </Typography>
                    </CardContent>
                </div>
            </Card>
            <div className='my-profile-content_item'>
                <div>
                    <MyPurchase myPurchaseItems={myPurchaseItems}/>
                </div>
                <div>
                    <MySales myBougthItems={myBougthItems} />
                </div>
            </div>
         </div>
      
        </div>
    );
}