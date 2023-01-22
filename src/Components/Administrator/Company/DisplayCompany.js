import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { Grid,Avatar,Button,TextField } from "@mui/material";
import { useStyles } from "./DisplayCompanyCss";
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

export function DisplayCompany(props){
    const classes=useStyles()
    const navigate=useNavigate()
    var [company,setCompany]=useState([])
    var [companyId,setCompanyId]=useState('')
    var [categoryId,setCategoryId]=useState('')
    var [subcategoryId,setSubCategoryId]=useState('')
    var [companyName, setCompanyName] = useState('')
    var [categoryList,setCategoryList]=useState([])
    var [prevIcon, setPrevIcon] = useState('')
   var [oldIcon, setOldIcon] = useState('')
    var [subcategoryList,setSubCategoryList]=useState([])
    var [icon, setIcon] = useState({ filename: "/assets/defaultcar.png", byte: "" })
    const [open, setOpen] = useState(false)
    var [buttonStatus, setButtonStatus] = useState({ upload: true, save_discard: false })

    const fetchCompany = async () => {
      var result = await getData('company/display_company')
      setCompany(result.data)
  
    }
    useEffect (function(){
      fetchCompany()
    },[])

    const fillCategoryDropDown=()=>{
      return categoryList.map((item)=>{

          return (
              <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
          )



      })
  }



  const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategoryList(result.data)
}

useEffect(function(){
    fetchAllCategory()
    fetchAllSubCategory()
},[])

const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    setSubCategoryList(result.data)
}

const fetchAllSubcategoryByCategory=async(category_id)=>{
  var body={categoryid:category_id}
  var response= await postData('subcategory/fetch_all_subcategory_by_category')
  setSubCategoryList(response.result)
}


const handleDiscard = () => {
  setIcon({ filename: prevIcon, bytes: '' })
  setButtonStatus({ upload: true })
}



const fillSubCategoryDropDown=()=>{
  return subcategoryList.map((item)=>{

      return (
          <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )



  })
}







const handleSetDataForDialog=(rowData)=>{
  fetchAllCategory()
  fetchAllSubCategory()
  setCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  setCompanyId(rowData.companyid)
  setCompanyName(rowData.companyname)
  setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
  setOpen(true)
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
  setOldIcon(rowData.icon)
}

const handleChange=(event)=>{
  setCategoryId(event.target.value)
  fetchAllSubcategoryByCategory(event.target.value)
}

const handlePicture = (event) => {
  setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  setButtonStatus(true)
}



const handleEditData = async () => {
  var formData = { companyname: companyName, companyid: companyId }
  var response = await postData('company/edit_data', formData)
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
  fetchCompany()
  setOpen(false)
}



const handleDelete =async() => {
  var body={companyid:companyId,oldicon:oldIcon}
  var response= await postData('company/delete_data',body)
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
fetchCompany()
setOpen(false)
}


const handleSavePicture = async () => {
  var formData = new FormData()
  formData.append('companyid', companyId)
  formData.append('icon', icon.bytes)
  formData.append('oldicon', oldIcon)
  var response = await postData('company/edit_picture', formData)
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
  fetchCompany()
  setOpen(false)
  setButtonStatus({ upload: true })
}


const showHidePictureButtons = () => {
  return (<div>
    {buttonStatus.upload ? <><Button fullWidth variant="contained" component="label">
      Upload
      <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
    </Button></> : <><Button onClick={handleSavePicture} color='primary'>Save</Button><Button onClick={handleDiscard} color='secondary'>Discard</Button></>}

  </div>)


}





    var handleClose=()=>{
      setOpen(false)
    }

function displayCompany(){
return(
<MaterialTable
      title="Company"
      columns={[
        { title: 'Company Id', field: 'companyid' },
        { title: 'Category', field: 'categoryname' },
        { title: 'SubCategory', field: 'subcategoryname'},
        { title: 'Company Name', field: 'companyname'},
        { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 40, height: 40 }} variant="rounded" /> }

      ]}
      data={company}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit',
          onClick: (event, rowData) =>handleSetDataForDialog(rowData)},
        {
          icon: 'add',
          tooltip: 'Add Category',
          isFreeAction: true,
          onClick: (event) => navigate('/dashboard/company')
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
                        Company Interface
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
                                onChange={handleChange}
                            >
                                {fillSubCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField value={companyName}onChange={(event)=>setCompanyName(event.target.value)} label="Company Name" fullWidth/>    
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
            {displayCompany()}
          </div>
          {showDialog()}
        </div>
    
      )



}