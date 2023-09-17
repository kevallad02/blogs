import React from 'react'
import BlogTable from '../components/blogs/BlogTable'
import { useState } from 'react'
import { useEffect } from 'react'
import adminService from '../services/admin.service'
import { Box, Button, Container } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Bloglist = () => {
    const [blogData, setBlogData] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        getBlogApi()
    }, [])
    async function getBlogApi() {
        setLoader(true)
        try {
            const res = await adminService.blogListService()
            if (res.status === 200) {
                setLoader(false)
                setBlogData(res.data.data)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <Container>
                <Box justifyContent='end' display='flex' mt='20px' right='10px'>
                    <Link to="/admin/add-blogs">
                        <Button color='inherit' variant='contained'>Add Blog</Button>
                    </Link>
                </Box>
                <BlogTable loader={loader} blogData={blogData} />
            </Container>
        </>
    )
}

export default Bloglist