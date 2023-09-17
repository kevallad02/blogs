import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import userService from '../../services/user.service'
import { useState } from 'react'

const BlogDetail = () => {
    const location = useLocation().search
    const id = new URLSearchParams(location).get('id')
    const [blogDetail, setBlogDetail] = useState({})
    useEffect(() => {
        blogDetailApi()
    }, [])
    const blogDetailApi = async () => {
        try {
            const res = await userService.blogDetail(id)
            if (res.status === 200) {
                setBlogDetail(res.data.data)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className='spacing'></div>
            <div className='blog-detail-main'>
                <div className='blog-loading-sapcing'>
                    {blogDetail.category !== undefined && blogDetail.category.categoryName !== undefined && <p className='blog-detail-label'>{blogDetail.category.categoryName}</p>}
                    <h1 className='blog-title'>{blogDetail.title !== undefined && blogDetail.title !== null && blogDetail.title !== "" && blogDetail.title}</h1>
                    <div className='blog-detail-banner'>
                        {blogDetail.image !== undefined && blogDetail.image !== null && blogDetail.image !== "" &&
                            <img className='blog-heading-img' src={blogDetail.image !== undefined && blogDetail.image !== null && blogDetail.image !== "" && blogDetail.image} />}
                    </div>
                    <div className='blog-details-main-all'>
                        {blogDetail.longDescription !== undefined && blogDetail.longDescription !== null && blogDetail.longDescription !== "" && <div className='blog-detail-main blog-html-content' dangerouslySetInnerHTML={{ __html: blogDetail.longDescription }}></div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetail