import React, {useEffect, useState} from "react"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Button, ButtonGroup } from '@mui/material';
import { db } from "../firebais/fiarebaisForBuyers";
import { getFirestore, getDocs,collection, where, query } from "firebase/firestore/lite"

console.log(db)
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    type: 'car'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
    type: 'car'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
    type: 'image'
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    type: 'image'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    type: 'other'
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    type: 'other'

  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
    type: 'other'
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
    type: 'other'
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    type: 'other'
 
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
    type: 'other'
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
    type: 'other'
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    type: 'car'
  },
];

export default function TitlebarImageList() {

  // const [data, setData] = useState([...itemData])
  const [dataClone, setDataClone] = useState([])
  const [auctionItems,setAuctionItems]=useState([])
  const [activeButton, setActiveButton] = useState('all')


  const fetchBlogs= async (db)=>{
    const response=collection(db,'AuctionItems');
    const q = query(response, where("date", ">=", new Date()))
    const data = await getDocs(q);
    const auctionAllItems = data.docs.map(item => {
      console.log(item.data())
      return item.data()
    })
    setAuctionItems(auctionAllItems)
    setDataClone(auctionAllItems)
    console.log(data)
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


  return (<div>
        {console.log(auctionItems)}
        <ButtonGroup size='large' variant="contained" aria-label="outlined primary button group" className="filter-btn">
          <Button variant={activeButton === 'all' ? 'contained' : 'outlined'} value="all" cols={3} onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }} >All</Button>
          <Button variant={activeButton === 'car' ? 'contained' : 'outlined'} value="car" onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }}>Cars</Button>
          <Button variant={activeButton === 'image' ? 'contained' : 'outlined'} value="image" onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }}>Images</Button>
          <Button variant={activeButton === 'other' ? 'contained' : 'outlined'} value="other" onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }}>Other</Button>
        </ButtonGroup>
    <ImageList cols={12}>
    {/* <ImageListItem key="Subheader" cols={12}>
      <ListSubheader component="div">{<h1 style={{alignItems: 'center',}}>All items</h1>}</ListSubheader>
    </ImageListItem> */}
      {dataClone.map((item) => (
        <ImageListItem cols={3} key={item.img} className='image-list_item'>
          <img
            src={item.imgUrl}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.itemName}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

