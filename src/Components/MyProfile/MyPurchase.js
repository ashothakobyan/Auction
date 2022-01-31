import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MyPurchase({myPurchaseItems}) {
    return (
        <div>
            {
                myPurchaseItems.length?<>
                <h1>My Purchase</h1>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {myPurchaseItems.map((item) => (
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
                </>:<h1>You Don't have Purchase</h1>
            }
        </div>
    );
}