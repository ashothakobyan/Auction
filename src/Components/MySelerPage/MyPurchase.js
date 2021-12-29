import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where, getDoc } from 'firebase/firestore/lite';
import { db } from '../../firebais/fiarebaisForBuyers';

export default function MyPurchase(props) {

    const [myItems, setMyItems] = React.useState([]);
    let { email } = useSelector((state) => state.auction.user);

    const fetchBlogs = React.useCallback(async (db, e) => {
        const response = collection(db, 'AuctionItems');
        const q = query(response, where("owner", "==", e))
        const data = await getDocs(q);
        const auctionAllItems = data.docs.map(item => {
            return item.data()
        })
        const d = await Promise.all(auctionAllItems.map(async (item) => {
            const u = await getDoc(item.buyerUser)
            return {
                u: u.data(),
                ...item
            }
        }))
        console.log(d)
        setMyItems(d);
    }, [])


    React.useEffect(() => {
        if (email) {
            fetchBlogs(db, email)
        }
    }, [email, fetchBlogs])
    return (
        <div>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {myItems.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={item.imgUrl}
                            srcSet={`${item.imgUrl}`}
                            alt={item.itemName}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}