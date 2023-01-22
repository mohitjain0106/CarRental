import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { Grid,Avatar,Button,TextField } from "@mui/material";
import { useStyles } from "./DisplayModelCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from "react-router-dom";
import { ServerURL,getData,postData } from "../../Services/FetchNodeServices";


export function DisplayModel(props){
    const classes=useStyles()
    const navigate=useNavigate()
    var [model,setModel]=useState([])
    var [modelId,setModelId]=useState('')
    var [categoryId,setCategoryId]=useState('')
    var [subcategoryId,setSubCategoryId]=useState('')
    var [companyId,setCompanyId]=useState('')
    var [modelName,setModelName]=useState('')
    var [year,setYear]=useState('')
    var [categoryList,setCategoryList]=useState([])
    var [subcategoryList,setSubCategoryList]=useState([])
    var [companyList,setCompanyList]=useState([])
    var [prevIcon, setPrevIcon] = useState('')
    var [oldIcon, setOldIcon] = useState('')
    const [open, setOpen] = useState(false)
    var [buttonStatus, setButtonStatus] = useState({ upload: true, save_discard: false })
    var [icon, setIcon] = useState({ filename: "/assets/defaultcar.png", byte: "" })

    const fetchModel = async () => {
        var result = await getData('model/display_model')
        setModel(result.data)
    
      }
      useEffect (function(){
        fetchModel()
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

    useEffect(function(){
        fetchAllCategory()
        fetchAllSubCategory()
        fetchCompany()
    },[])


    const handleSetDataForDialog=(rowData)=>{
      fetchAllCategory()
      fetchAllSubCategory()
      fetchCompany()
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setModelId(rowData.modelid)
        setModelName(rowData.modelname)
        setYear(rowData.year)
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

    const fetchAllSubCategoryByCategory=async(category_id)=>{
        var body={categoryid:category_id}
        var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
        setSubCategoryList(response.result)
    }

    const handleEditData = async () => {
        var formData = { modelname: modelName,year:year, modelid: modelId }
        var response = await postData('model/edit_data', formData)
        if (response.status) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Category Updated successfully',
      
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
      
          })
      
        }
        fetchModel()
        setOpen(false)
      }

      const handleDelete =async() => {
        var body={modelid:modelId,oldicon:oldIcon}
        var response= await postData('model/delete_data',body)
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
      fetchModel()
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
        formData.append('modelid', modelId)
        formData.append('icon', icon.bytes)
        formData.append('oldicon', oldIcon)
        var response = await postData('model/edit_picture', formData)
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
        fetchModel()
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



    function displayModel(){
        return(
        <MaterialTable
              title="Model"
              columns={[
                { title: 'Model Id', field: 'modelid' },
                { title: 'Company Id', field: 'companyname' },
                { title: 'Category', field: 'categoryname' },
                { title: 'SubCategory', field: 'subcategoryname'},
                { title: 'Model Name', field: 'modelname'},
                { title: 'Year', field: 'year'},
                { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 40, height: 40 }} variant="rounded" /> }
        
              ]}
              data={model}        
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit',
                  onClick: (event, rowData) =>handleSetDataForDialog(rowData)},
                {
                  icon: 'add',
                  tooltip: 'Add Category',
                  isFreeAction: true,
                  onClick: (event) => navigate('/dashboard/model')
                }
              ]}
            /> 
        
        )}

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
                                  Model Interface
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
                                  <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                                      <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={subcategoryId}
                                          label="SubCategory"
                                          onChange={handleChangeSubCategory}
                                      >
                                          {fillSubCategoryDropDown()}
                                      </Select>
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={companyId}
                                    label="Company"
                                    onChange={handleChangeCompany}
                                >
                                    {fillCompanyDropDown()}
                                </Select>
                            </FormControl>
                        </Grid>
                              <Grid item xs={12}>
                              <TextField value={modelName}onChange={(event)=>setModelName(event.target.value)} label="Model Name" fullWidth/>    
                              </Grid>
                              <Grid item xs={12}>
                        <TextField value={year}onChange={(event)=>setYear(event.target.value)} label="Year" fullWidth/>    
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
            {displayModel()}
          </div>
          {showDialog()}
        </div>
    
      )
}