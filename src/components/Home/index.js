import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import userService from '../../services/user.service'

const Home = () => {

    const [blogData, setBlogData] = useState([])
    useEffect(() => {
        userBlogApi()
    },[])
    async function userBlogApi() {
        try {
            const res = await userService.blogList()
            if (res.status) {
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
                    <div className='row'>
                        {blogData.map((item) => (
                            <div className='col-sm-6 col-lg-4'>
                                <BlogCard data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home