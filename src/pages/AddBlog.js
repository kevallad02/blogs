import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import * as yup from "yup";
import 'react-quill/dist/quill.snow.css';


const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    category: yup.string().required("required"),
});
const initialValues = {
    title: "",
    category: "",
    longdesc: "",
    shortdesc: ""
};
const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
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
    const [value, setValue] = useState('');
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    return (
        <>
            <Box m="20px">

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Blog Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    error={!!touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select label='Category' value={values.category} onChange={handleChange}>
                                        <MenuItem>test 1</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Short Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.shortdesc}
                                    name="shortdesc"
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                    <ReactQuill theme="snow" formats={formats} modules={modules} value={value} onChange={setValue} placeholder='long description' />
                                </FormControl>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Create Blog
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    )
}

export default AddBlog