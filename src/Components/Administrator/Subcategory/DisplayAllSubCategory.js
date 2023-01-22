import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { useStyles } from "./DisplayAllSubCategoryCss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getData, ServerURL, postData } from "../../Services/FetchNodeServices";
import { Grid, Button, Avatar, TextField } from "@material-ui/core"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

export default function DisplayAllSubCategory(props) {
  var classes = useStyles()
  var navigate=useNavigate()
  var [categoryId, setCategoryId] = useState('')
  var [subcategoryId, setSubCategoryId] = useState('')
  var [subcategoryName, setSubCategoryName] = useState('')
  var [icon, setIcon] = useState({ filename: "/assets/defaultcar.png", byte: "" })
  var [subcategory, setSubCategory] = useState([])
  const [open, setOpen] = useState(false)
  var [prevIcon, setPrevIcon] = useState('')
  var [oldIcon, setOldIcon] = useState('')
  var [categoryList,setCategoryList]=useState([])
  var [buttonStatus, setButtonStatus] = useState({ upload: true, save_discard: false })
  var [priority,setPriority]=useState('')


  const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategoryList(result.data)
}

useEffect(function(){
  fetchAllCategory()
},[])

  const handleSetDataForDialog = (rowData) => {
    fetchAllCategory()
    fetchAllSubCategory()
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
    setOpen(true)
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOldIcon(rowData.icon)
    setPriority(rowData.priority)
  }

  const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: '' })
    setButtonStatus({ upload: true })
  }

  const handleChange=(event)=>{
    setCategoryId(event.target.value)
}

const fillCategoryDropDown=()=>{
  return categoryList.map((item)=>{

      return (
          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )



  })
}



  const handlePicture = (event) => {
    setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setButtonStatus(true)

  }


  const fetchAllSubCategory = async () => {
    var result = await getData('subcategory/display_all_subcategory')
    setSubCategory(result.data)

  }

  useEffect(function(){

    fetchAllSubCategory()
  },[])

  const handleDelete =async() => {
    var body={subcategoryid:subcategoryId,oldicon:oldIcon}
    var response= await postData('subcategory/delete_data',body)
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
  fetchAllSubCategory()
  setOpen(false)
  }

  const handleEditData = async () => {
    var formData = {  subcategoryid: subcategoryId,subcategoryname: subcategoryName,categoryid:categoryId,priority:priority }
    var response = await postData('subcategory/edit_data', formData)
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
    fetchAllSubCategory()
    setOpen(false)
  }

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append('subcategoryid', subcategoryId)
    formData.append('icon', icon.bytes)
    formData.append('oldicon', oldIcon)
    var response = await postData('subcategory/edit_picture', formData)
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
    fetchAllSubCategory()
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




  const handleClose = () => {
    setOpen(false)
  }


  function displaySubCategories() {
    return (

      <MaterialTable
        title="List of Categories"
        columns={[
          { title: 'SubCategory Id', field: 'subcategoryid' },
          { title: 'Category', field: 'cname' },
          { title: 'name', field: 'subcategoryname' },
          { title: 'Priority',field:'priority'},
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 40, height: 40 }} variant="rounded" /> }

        ]}
        data={subcategory}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Categories',
            onClick: (event, rowData) => handleSetDataForDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/subcategory')
          }
        ]}
      />
    )
  }

  const showDialog = () => {
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
                  SubCategory Interface
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
                  <TextField value={subcategoryName} onChange={(event) => setSubCategoryName(event.target.value)} label="SubCategory Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                        <TextField value={priority} onChange={(event)=>setPriority(event.target.value)} label='Priority' fullWidth />
                    </Grid>

                <Grid item xs={6}>
                  {showHidePictureButtons()}
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
        {displaySubCategories()}
      </div>
      {showDialog()}
    </div>

  )












}