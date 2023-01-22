import { useState, useEffect } from "react";
import { Grid, TextField, Avatar, Button } from "@mui/material"
import { useStyles} from "./SubCategoryCss";
import {ServerURL, postData,getData } from "../../Services/FetchNodeServices";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
export default function SubCategory(props) {
    const classes = useStyles()
    var navigate=useNavigate()
    var [subcategoryName, setSubCategoryName] = useState('')
    var [categoryId, setCategoryId] = useState('')
    var [priority,setPriority]=useState('')
    var [categoryList,setCategoryList]=useState([])
    var [icon, setIcon] = useState({ filename: "/assets/defaultcar.png", byte: "" })
    
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillCategoryDropDown=()=>{
        return categoryList.map((item)=>{

            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )



        })
    }

    const handleShowSubCategoryList=()=>{
        navigate('/dashboard/displayallsubcategory')


    }
    
    const handleChange=(event)=>{
        setCategoryId(event.target.value)
    }
    
    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid',categoryId);
        formData.append('subcategoryname', subcategoryName)
        formData.append('icon', icon.bytes)
        formData.append('priority',priority);

        var response = await postData('subcategory/subcategorysubmit', formData)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Subcategory submitted successfully',

            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })

        }
    }

    const clearValues = () => {
        setSubCategoryName('')
        setIcon({ filename: "/assets/defaultcar.png", bytes: '' })


    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingStyle}>
                    <div className={classes.center}>
                    <ListAltIcon onClick={handleShowSubCategoryList}/>
                 <div style={{marginleft:5}}>
                        SubCategory Interface
                        </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category"
                                onChange={handleChange}
                            >
                                {fillCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event)=>setSubCategoryName(event.target.value)} label='SubCategory Name' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event)=>setPriority(event.target.value)} label='Priority' fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                        </Button>

                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar
                            alt="SubCategory Icon"
                            src={icon.filename}
                            variant="rounded"
                            sx={{ width: 120, height: 56 }}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={clearValues} variant="contained" fullWidth>
                            Reset
                        </Button>
                    </Grid>


                </Grid>

            </div>


        </div>

    )


}