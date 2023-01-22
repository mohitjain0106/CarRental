import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { Grid, Avatar, Button, TextField } from "@mui/material";
import { useStyles } from "../Vehicle/DisplayVehicleCss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from "react-router-dom";
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";


export function DisplayVehicle(props) {
    const classes = useStyles()
    const navigate=useNavigate()
    var [vehicle,setVehicle]=useState([])
    var [modelId,setModelId]=useState('')
    var [categoryId,setCategoryId]=useState('')
    var [subcategoryId,setSubCategoryId]=useState('')
    var [companyId,setCompanyId]=useState('')
    var [vehicleId,setVehicleId]=useState('')
    var [vendorId, setVendorId] = useState('')
    var [rent,setRent]=useState('')
    var [registrationNo, setRegistrationNo] = useState('')
    var [color, setColor] = useState('')
    var [rating, setRating] = useState('')
    var [average, setAverage] = useState('')
    var [remark, setRemark] = useState('')
    var [status, setStatus] = useState('')
    var [feature, setFeature] = useState('')
    var [capacity, setCapacity] = useState('')
    var [categoryList,setCategoryList]=useState([])
    var [subcategoryList,setSubCategoryList]=useState([])
    var [companyList,setCompanyList]=useState([])
    var [modelList,setModelList]=useState([])
    var [prevIcon, setPrevIcon] = useState('')
    var [oldIcon, setOldIcon] = useState('')
    const [open, setOpen] = useState(false)
    var [buttonStatus, setButtonStatus] = useState({ upload: true, save_discard: false })
    var [icon, setIcon] = useState({ filename: "/assets/defaultcar.png", byte: "" })

    const fetchVehicle = async () => {
        var result = await getData('vehicle/display_vehicle')
        setVehicle(result.data)
    
      }
      useEffect (function(){
        fetchVehicle()
      },[])

      const fillCategoryDropDown=()=>{
        return categoryList.map((item)=>{
  
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategoryDropDown=()=>{
        return subcategoryList.map((item)=>{
      
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
      }

      const fillCompanyDropDown=()=>{
        return companyList.map((item)=>{
            return(
                <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
            )
        })
    }

    const fillModelDropDown=()=>{
        return modelList.map((item)=>{
            return(
                <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
            )
        })
    }

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    const fetchAllSubCategory=async()=>{
        var result=await getData('subcategory/display_all_subcategory')
        setSubCategoryList(result.data)
    }

    const fetchCompany=async()=>{
        var result=await getData('company/display_company')
        setCompanyList(result.data)
    }
    const fetchModel=async()=>{
        var result= await getData('model/display_model')
        setModelList(result.data)
    }
    useEffect(function(){
        fetchAllCategory()
        fetchAllSubCategory()
        fetchCompany()
        fetchModel()
    },[])

    const handleSetDataForDialog=(rowData)=>{
        fetchAllCategory()
        fetchAllSubCategory()
        fetchCompany()
        fetchModel()
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setModelId(rowData.modelid)
        setVehicleId(rowData.vehicleid)
        setVendorId(rowData.vendorid)
        setAverage(rowData.average)
        setCapacity(rowData.capacity)
        setColor(rowData.color)
        setFeature(rowData.feature)
        setRating(rowData.rating)
        setRegistrationNo(rowData.registrationno)
        setRent(rowData.rentperhour)
        setRemark(rowData.remark)
        setStatus(rowData.status)
        setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
        setOpen(true)
        setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
        setOldIcon(rowData.icon)
      }

      const handleChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategoryByCategory(event.target.value)
    }

    const handleChangeSubCategory=(event)=>{
        setSubCategoryId(event.target.value)
    }

    const handleChangeCompany=(event)=>{
        setCompanyId(event.target.value)
    }

    const handleChangeModel=(event)=>{
        setModelId(event.target.value)
    }

    const fetchAllSubCategoryByCategory=async(category_id)=>{
        var body={categoryid:category_id}
        var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
        setSubCategoryList(response.result)
    }


    const handleEditData = async () => {
        var formData = { vehicleid: vehicleId,vendorid:vendorId,average: average,color:color,capacity:capacity,remark:remark,registrationno:registrationNo,rentperhour:rent,status:status,rating:rating,feature:feature }
        var response = await postData('vehicle/edit_data', formData)
        if (response.status) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Vehicle Updated successfully',
      
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
      
          })
      
        }
        fetchVehicle()
        setOpen(false)
      }

      const handleDelete =async() => {
        var body={vehicleid:vehicleId,oldicon:oldIcon}
        var response= await postData('vehicle/delete_data',body)
        if(response.status){
          Swal.fire({
              icon: 'success',
              title: 'Done',
              text: 'SubCategory Deleted successfully',
      
            })
      }
      else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              
            })
      
      }
      fetchVehicle()
      setOpen(false)
      }


      var handleClose=()=>{
        setOpen(false)
      }


      const showHidePictureButtons = () => {
        return (<div>
          {buttonStatus.upload ? <><Button fullWidth variant="contained" component="label">
            Upload
            <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
          </Button></> : <><Button onClick={handleSavePicture} color='primary'>Save</Button><Button onClick={handleDiscard} color='secondary'>Discard</Button></>}
      
        </div>)
      
      
      }


      const handleSavePicture = async () => {
        var formData = new FormData()
        formData.append('vehicleid', vehicleId)
        formData.append('icon', icon.bytes)
        formData.append('oldicon', oldIcon)
        var response = await postData('vehicle/edit_picture', formData)
        if (response.status) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Icon Updated successfully',
      
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
      
          })
      
        }
        fetchVehicle()
        setOpen(false)
        setButtonStatus({ upload: true })
      }


      const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setButtonStatus(true)
      }

      const handleDiscard = () => {
        setIcon({ filename: prevIcon, bytes: '' })
        setButtonStatus({ upload: true })
      }





    function displayVehicle() {
        return (
            <MaterialTable
                title="Vehicle"
                columns={[

                    { title: 'Category', field: 'categoryname',render:(rowData)=><div>{rowData.categoryname}<br/>{rowData.subcategoryname}<br/></div> },
                    { title: 'Company', render:(rowData)=><div>{rowData.companyname}<br/>{rowData.modelname}/{rowData.capacity}</div> },                
                    { title: 'Vehicle', field: 'vehicleid',render:(rowData)=><div>{rowData.vehicleid}/{rowData.vendorid}<br/>{rowData.status}</div> },                   
                    { title: 'Registration', field: 'registrationno',render:(rowData)=><div>{rowData.registrationno}/{rowData.color}<br/>{rowData.fueltype}/{rowData.average}</div> },                    
                    { title: 'Rating', field: 'ratings' },                    
                    { title: 'Remark', field: 'remark' },                                       
                    { title: 'feature', field: 'feature' },
                    { title: 'Rent/Hr', field: 'rentperhour' },
                    { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 40, height: 40 }} variant="rounded" /> }

                ]}
                data={vehicle}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleSetDataForDialog(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Category',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/vehicle')
                    }
                ]}
            />

        )
    }

    const showDialog=()=>{
        return (
          <div>
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            
              <DialogContent>
              <div className={classes.box}>
                      <Grid container spacing={2}>
                          <Grid item xs={12} className={classes.headingStyle}>
                          <div className={classes.center}>
                              Company Interface
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
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} label="Vehicle Id" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={vendorId} onChange={(event) => setVendorId(event.target.value)} label="Vendor Id" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={registrationNo} onChange={(event) => setRegistrationNo(event.target.value)} label="Registration No" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={rent} onChange={(event) => setRent(event.target.value)} label="Rent/hr" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={color} onChange={(event) => setColor(event.target.value)} label="Color" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={rating} onChange={(event) => setRating(event.target.value)} label="Rating" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={average} onChange={(event) => setAverage(event.target.value)} label="Average" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField  value={remark} onChange={(event) => setRemark(event.target.value)} label="Remark" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={capacity} onChange={(event) => setCapacity(event.target.value)} label="Capacity" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={status} onChange={(event) => setStatus(event.target.value)} label="Status" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={feature} onChange={(event) => setFeature(event.target.value)} label="Feature" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                        </Button>

                    </Grid>
                    <Grid item xs={6}>
                              {showHidePictureButtons()}        
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
                        <Button onClick={handleEditData} variant="contained" fullWidth>
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button onClick={handleDelete} variant="contained" fullWidth>
                          Delete
                        </Button>
                      </Grid>
          
          
          
                      </Grid>
                  </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            </div>
      
        )
      }











    return (
        <div className={classes.dialogmainContainer}>
            <div className={classes.dialogBox}>
                {displayVehicle()}
            </div>
            {showDialog()}
        </div>

    )

}