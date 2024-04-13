import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import userService from '../../services/user.service'
import { CircularProgress } from '@mui/material'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const location = useLocation().search
    const search = new URLSearchParams(location).get("search")
    const [blogData, setBlogData] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(true)
        userBlogApi(search)
    }, [search])
    async function userBlogApi(search) {
        let query = `?search=${search ? search : ""}`
        try {
            const res = await userService.blogList(query)
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