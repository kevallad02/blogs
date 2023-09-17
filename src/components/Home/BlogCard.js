import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import dummy from '../../assest/images/dummy.jpg'
import { Share } from '@mui/icons-material';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BlogCard = ({ data }) => {
    return (
        <>
            <div className='blog-card-main'>
                <Card sx={{ maxWidth: 345 }}>
                    <Link to={`/detail?id=${data._id}`}>
                        <CardMedia
                            className='card-img'
                            component="img"
                            height="194"
                            image={data.image}
                            alt="Paella dish"
                        />
                    </Link>
                    <CardContent>
                        <Typography>{moment(data.createdDate).format('DD MMM, YYYY')}</Typography>
                        <h5 className='card-title'>{data.title}</h5>
                        <Typography variant="body2" className='short-desc' >
                            {data.shortDescription}
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