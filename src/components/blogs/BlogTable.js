import { Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const BlogTable = () => {
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default BlogTable