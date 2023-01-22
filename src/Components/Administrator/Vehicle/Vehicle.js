import { useState, useEffect } from "react";
import { useStyles } from "./VehicleCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import { getData, postData, ServerURL } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Vehicle(prop) {
    const classes = useStyles()
    var navigate = useNavigate()
    var [categoryId, setCategoryId] = useState('')
    var [subcategoryId, setSubCategoryId] = useState('')
    var [companyId, setCompanyId] = useState('')
    var [modelId, setModelId] = useState('')
    var [vehicleId, setVehicleId] = useState('')
    var [vendorId, setVendorId] = useState('')
    var [registrationNo, setRegistrationNo] = useState('')
    var [color, setColor] = useState('')
    var [ratings, setRatings] = useState('')
    var [average, setAverage] = useState('')
    var [rent,setRent]=useState('')  
    var [fueltype,setFuelType]=useState('')
    var [remark, setRemark] = useState('')
    var [status, setStatus] = useState('')
    var [feature, setFeature] = useState('')
    var [capacity, setCapacity] = useState('')
    var [categoryList, setCategoryList] = useState([])
    var [subcategoryList, setSubCategoryList] = useState([])
    var [companyList, setCompanyList] = useState([])
    var [modelList, setModelList] = useState([])
    var [icon, setIcon] = useState({ filename: "/assets/defaultcar.png", byte: "" })
   
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
       }
       

    const fillCategoryDropDown = () => {
        return categoryList.map((item) => {

            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )



        })
    }
    const fetchAllSubCategoryByCategory = async (category_id) => {
        var body = { categoryid: category_id }
        var response = await postData('subcategory/fetch_all_subcategory_by_category', body)
        setSubCategoryList(response.result)
    }
    const fillSubCategoryDropDown=()=>{
        return subcategoryList.map((item)=>{
      
          return(
            <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
          )
        })
      }
      const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
        var body={subcategoryid:subcategory_id}
        var response=await postData('company/fetch_all_company_by_subcategory',body)
        setCompanyList(response.result)
      }
      
      const fillCompanyDropDown=()=>{
       return companyList.map((item)=>{
      
         return(
           <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
         )
       })
      }
      const fetchAllModelByCompany=async(company_id)=>{
        var body={companyid:company_id}
        var response=await postData('model/fetch_all_model_by_company',body)
        setModelList(response.result)
      }
      
      const fillModelDropDown=()=>{
       return modelList.map((item)=>{
      
         return(
           <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
         )
       })
      }
    useEffect(function(){
        fetchAllCategory()
       },[])




    const handleChange = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubCategoryByCategory(event.target.value)
    }

    const handleChangeSubCategory = (event) => {
        setSubCategoryId(event.target.value)
        fetchAllCompanyBySubCategory(event.target.value)
    }
    const handleChangeCompany = (event) => {
        setCompanyId(event.target.value)
        fetchAllModelByCompany(event.target.value)
    }

    const handleChangeModel = (event) => {
        setModelId(event.target.value)
    }
    
    const handleFuel=(event)=>{
        setFuelType(event.target.value)
     
        }
        const handleRatings=(event)=>{
            setRatings(event.target.value)
            }

            const handlestatusChange=(event)=>{
                setStatus(event.target.value)
                } 

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subcategoryId)
        formData.append('companyid', companyId)
        formData.append('modelid', modelId)
        formData.append('vehicleid', vehicleId)
        formData.append('vendorid', vendorId)
        formData.append('registrationno', registrationNo)
        formData.append('color', color)
        formData.append('ratings', ratings)
        formData.append('average', average)
        formData.append('remark', remark)
        formData.append('rentperhour',rent)
        formData.append('capacity', capacity)
        formData.append('status', status)
        formData.append('feature', feature)
        formData.append('icon', icon.bytes)
        formData.append('fueltype',fueltype)


        var response = await postData('vehicle/vehiclesubmit', formData)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Vehicle submitted successfully',

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

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }


    const clearValues = () => {

        setCategoryId('')
        setSubCategoryId('')
        setCompanyId('')
        setModelId('')
        setAverage('')
        setCapacity('')
        setColor('')
        setFeature('')
        setFuelType('')
        setRatings('')
        setVendorId('')
        setRemark('')
        setStatus('')
        setFeature('')
        setRent('')
        setIcon({ filename: "/assets/defaultcar.png", bytes: '' })


    }

    const handleShowVehicleList = () => {
        navigate('/dashboard/displayvehicle')


    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingStyle}>
                        <div className={classes.center}>
                            <ListAltIcon onClick={handleShowVehicleList} />
                            <div style={{ marginleft: 5 }}>
                                Vehicle Interface
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Select Category"
                                onChange={handleChange}
                            >
                                {fillCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subcategoryId}
                                label="Select SubCategory"
                                onChange={handleChangeSubCategory}
                            >
                                {fillSubCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId}
                                label="Select Company"
                                onChange={handleChangeCompany}
                            >
                                {fillCompanyDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modelId}
                                label="Select Model"
                                onChange={handleChangeModel}
                            >
                                {fillModelDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setVendorId(event.target.value)} label="Vendor Id" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setRegistrationNo(event.target.value)} label="Registration No" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setColor(event.target.value)} label="Color" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setRent(event.target.value)} label="Rent" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Fueltype
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fueltype}
                label="Select Fueltype"
               onChange={handleFuel}
              >
            <MenuItem value={1}>Petrol</MenuItem>
            <MenuItem value={2}>Diesel</MenuItem>
            <MenuItem value={3}>CNG</MenuItem>
            <MenuItem value={4}>Electric</MenuItem>
              </Select>
            </FormControl>
</Grid>
<Grid item xs={4}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Ratings
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ratings}
                label="Select Ratings"
               onChange={handleRatings}
              >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
                </Grid>
                    
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setAverage(event.target.value)} label="Average" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setRemark(event.target.value)} label="Remark" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setCapacity(event.target.value)} label="Capacity" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={status}
                   onChange={handlestatusChange}
                   >
                  <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
                  <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
                  </RadioGroup>
                  </FormControl>
                </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setFeature(event.target.value)} label="Feature" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                        </Button>

                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar
                            alt="Category Icon"
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