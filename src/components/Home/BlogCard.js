import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import dummy from '../../assest/images/dummy.jpg'
import { Share } from '@mui/icons-material';

const BlogCard = () => {
    return (
        <>
            <div className='blog-card-main'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={dummy}
                        alt="Paella dish"
                    />
                    <CardContent>
                    <Typography>13 Aug, 2023</Typography>
                        <Typography variant="body2" >
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <Share />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}

export default BlogCard