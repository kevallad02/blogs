import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

const AddBlog = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [value, setValue] = useState({
        title: "",
        category: "",
        short_desc: ""
    });
    const [longDesc, setLongDesc] = useState('')
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValue({ ...value, [name]: value })
    }
    const handleFormSubmit = () => {
        console.log('value', value)
    };
    console.log('longDesc', longDesc)
    return (
        <>
            <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Typography variant="h4" gutterBottom>
                        Create New Blog
                    </Typography>
                    <Box m="20px">
                        <form onSubmit={handleFormSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Title"
                                            variant="outlined"
                                            fullWidth
                                            name='title'
                                            value={value.title}
                                            onChange={handleOnChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Category</InputLabel>
                                            <Select label="Category" name='category' value={value.category} onChange={handleOnChange}>
                                                <MenuItem value="technology">Technology</MenuItem>
                                                <MenuItem value="travel">Travel</MenuItem>
                                                {/* Add more categories */}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Short Description"
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={value.short_desc}
                                            name='short_desc'
                                            onChange={handleOnChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={longDesc}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setLongDesc(data)
                                                console.log({ event, editor, data });
                                            }}
                                            onBlur={(event, editor) => {
                                                console.log('Blur.', editor);
                                            }}
                                            onFocus={(event, editor) => {
                                                console.log('Focus.', editor);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Create Blog
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default AddBlog