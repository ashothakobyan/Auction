import React, {useEffect, useState} from "react"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Button, ButtonGroup } from '@mui/material';
import { db } from "../../firebais/fiarebaisForBuyers";
import { getDocs,collection, where, query } from "firebase/firestore/lite"
import { useNavigate } from "react-router-dom";

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


export default function LiveCardImg({setItem}) {

  const [dataClone, setDataClone] = useState([])
  const [auctionItems,setAuctionItems]=useState([])
  const [activeButton, setActiveButton] = useState('all')
  const navigate = useNavigate()


  const fetchBlogs= async (db)=>{
    const response=collection(db,'AuctionItems');
    const resItems = query(response, where("date", ">=", new Date(new Date()-600000)))
    const data = await getDocs(resItems);
    let auctionAllItems = data.docs.map(item => {
      return item.data()
    }) 
    auctionAllItems=auctionAllItems.filter((item)=>  item.date.toDate()<=new Date() ) 
    setAuctionItems(auctionAllItems)
    setDataClone(auctionAllItems)
   
  }

  useEffect(() => {
    fetchBlogs(db);
  }, [])

  const filter = (type) => {
    let dataClone = []
    if(type === 'all') {
      dataClone = auctionItems
    } else {
      dataClone = auctionItems.filter((el) => el.type === type)
    }
    setDataClone(dataClone)
  }



  const live = (item)=> (new Date()-item?.date.toDate() >= 0 && new Date()-item?.date.toDate() <= 600000)

  const changeType = (e) => {
    filter(e.target.value)
    setActiveButton(e.target.value)
  }
  return (<div>

        <ButtonGroup size='large' variant="contained" aria-label="outlined primary button group" className="filter-btn">
          <Button variant={activeButton === 'all' ? 'contained' : 'outlined'} value="all" cols={3} onClick={(e) =>changeType(e)} >All</Button>
          <Button variant={activeButton === 'car' ? 'contained' : 'outlined'} value="car" onClick={(e) => changeType(e)}>Cars</Button>
          <Button variant={activeButton === 'image' ? 'contained' : 'outlined'} value="image" onClick={(e) => changeType(e)}>Images</Button>
          <Button variant={activeButton === 'other' ? 'contained' : 'outlined'} value="other" onClick={(e) => changeType(e)}>Other</Button>
        </ButtonGroup>
    <ImageList cols={12}>
      {dataClone.map((item) => (
        <ImageListItem  cols={3} key={item.img} className='image-list_item'>
          <img
          style={{
            width: "100%",
            height: "100%"
          }}
          onClick={()=>{
            setItem(item)
             navigate(`/buyPage/${item.itemName}`)
          }}
            src={item.imgUrl}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.itemName}
            subtitle={item.author}
            actionIcon={
              <div style={{
                display:"flex",
                alignItems:"center"
              }}>
              {live(item) && <h4>Live</h4>}
            <FiberManualRecordIcon  style={{ color: live(item)? 'red':"grey" }} />
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.itemName}`}
              >
                <InfoIcon />
              </IconButton>
              </div>
      
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

