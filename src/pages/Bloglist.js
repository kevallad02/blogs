import React from 'react'
import BlogTable from '../components/blogs/BlogTable'
import { useState } from 'react'
import { useEffect } from 'react'
import adminService from '../services/admin.service'
import { Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'

const Bloglist = () => {
    const [blogData, setBlogData] = useState([])
    useEffect(() => {
        getBlogApi()
    }, [])
    async function getBlogApi() {
        try {
            const res = await adminService.blogListService()
            if (res.status === 200) {
                setBlogData(res.data.data)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <Container>
                <Box justifyContent='end' display='flex' mt='20px' right='10px'>
                    <Link>
                        <Button variant='contained'>Add Blog</Button>
                    </Link>
                </Box>
                <BlogTable blogData={blogData} />
            </Container>
        </>
    )
}

export default Bloglist