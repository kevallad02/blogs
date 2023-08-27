import { TableBody } from '@mui/material'
import { Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment/moment';
const BlogTable = ({ blogData }) => {
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
                        {blogData.map((item, i) => (
                            <TableBody>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell><img height='100px' width='100px' src={item.image}/></TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{moment(item.createdDate).format('DD MMM, YYYY')}</TableCell>
                                <TableCell><EditIcon /> <DeleteIcon /></TableCell>
                            </TableBody>
                        ))
                        }
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default BlogTable