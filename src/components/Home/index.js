import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import userService from '../../services/user.service'
import { CircularProgress } from '@mui/material'

const Home = () => {

    const [blogData, setBlogData] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(true)
        userBlogApi()
    }, [])
    async function userBlogApi() {
        try {
            const res = await userService.blogList()
            if (res.status) {
                setLoader(false)
                setBlogData(res.data.data)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className='spacing'></div>
            <section className='blog-card-section'>
                <div className='cyber-blog-container'>
                    {loader ? <div className='cstm-loader'> <CircularProgress color='inherit' /> </div> :
                        <div className='row'>
                            {blogData.map((item) => (
                                <div className='col-sm-6 col-lg-4'>
                                    <BlogCard data={item} />
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Home