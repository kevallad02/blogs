import { CircularProgress, TableBody } from '@mui/material'
import { Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
const BlogTable = ({ blogData, loader }) => {
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table-body-container'>
                            {loader ? <div className='admin-loader'> <CircularProgress color='inherit' /> </div>
                                : blogData.map((item, i) => (
                                    <TableRow className='uic-th-td'>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell><img className='blog-img' src={item.image} /></TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{moment(item.createdDate).format('DD MMM, YYYY')}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/edit-blog?id=${item._id}`} className='table-icon'>
                                                <EditIcon />
                                            </Link>
                                            <Link className='table-icon'>
                                                <DeleteIcon />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default BlogTable