import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg'
import adminService from '../services/admin.service';
import { useDropzone } from 'react-dropzone';
import draftToHtml from 'draftjs-to-html'
import { useLocation } from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs';
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

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
const EditBlog = () => {

    const location = useLocation().search
    const id = new URLSearchParams(location).get('id')
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [files, setFiles] = useState([]);
    const [value, setValue] = useState({
        title: "",
        category: "",
        short_desc: "",
        longDesc: EditorState.createEmpty(),
        image: ""
    });
    const [categories, setCategories] = useState([])
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValue(prevValue => ({ ...prevValue, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const desc = draftToHtml(convertToRaw(value.longDesc.getCurrentContent()))
        const formData = new FormData()
        formData.append('title', value.title)
        formData.append('shortDescription', value.short_desc)
        formData.append('category', value.category)
        formData.append('image', files[0])
        formData.append('longDescription', desc)
        const res = await adminService.editBlog(id,formData)
        console.log('res', res)
    };

    useEffect(() => { categoriesList() }, [])
    async function categoriesList() {
        try {
            const [res,
                blogDeatilRes
            ] = await Promise.all([adminService.categoriesService(),
            adminService.getBlogById(id)
            ])
            console.log('blogDeatilRes', blogDeatilRes)
            if (blogDeatilRes.status === 200) {
                const contentBlock = htmlToDraft(blogDeatilRes.data.data.longDescription);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setValue({
                    ...value,
                    title: blogDeatilRes.data.data.title,
                    short_desc: blogDeatilRes.data.data.shortDescription,
                    category: blogDeatilRes.data.data.category._id,
                    longDesc: editorState,
                    image: blogDeatilRes.data.data.image
                })
            }
            if (res.status) {
                setCategories(res.data.data)
            }
        } catch (error) {

        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));
    return (
        <>
            <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Typography variant="h4" gutterBottom>
                        Edit Blog
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
                                                {categories.map((item) => (<MenuItem value={item._id}>{item.categoryName}</MenuItem>))}
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
                                        <div>
                                            <Editor
                                                editorState={value.longDesc}
                                                onEditorStateChange={(editorState) => setValue({ ...value, longDesc: editorState })}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <section className="container">
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Edit Blog
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

export default EditBlog