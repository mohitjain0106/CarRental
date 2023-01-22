import MaterialTable from '@material-table/core'
import { useState,useEffect } from 'react'
import { useStyles } from './DisplayAllCategoryCss'

import { getData,postData,ServerURL } from '../../Services/FetchNodeServices'
import { Avatar,Button,TextField,Grid} from '@material-ui/core'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

export default function DisplayAllCategory(props){
  var classes=useStyles()
  var navigate=useNavigate()
  var [icon,setIcon]=useState({filename:"/assets/defaultcar.png",byte:""})
  var [prevIcon,setPrevIcon]=useState('')
  var [oldIcon,setOldIcon]=useState('')
  var [category,setCategory]=useState([])
  var [categoryName,setCategoryName]=useState('')
  const [categoryID,setCategoryID]=useState('')
  var [buttonStatus,setButtonStatus]=useState({upload:true,save_discard:false})
  const [open,setOpen]=useState(false)
 
 
  const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategory(result.data)

  } 
  
  useEffect(function(){

    fetchAllCategory()
  },[])

  const handleSetDataForDialog=(rowData)=>{
    setCategoryID(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setOpen(true)
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOldIcon(rowData.icon)
  }
  const handleDiscard=()=>{
    setIcon({filename:prevIcon,bytes:''})
    setButtonStatus({upload:true})
  }

  const handleSavePicture=async()=>{
    var formData= new FormData()
    formData.append('categoryid',categoryID)
    formData.append('icon',icon.bytes)
    formData.append('oldicon',oldIcon)
    var response= await postData('category/edit_picture',formData)
    if(response.status){
      Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Icon Updated successfully',
  
        })
  }
  else{
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })

  }
  fetchAllCategory()
  setOpen(false)
  setButtonStatus({upload:true})
  }




  const handleEditData=async()=>{
    var formData={categoryname:categoryName,categoryid:categoryID}
    var response= await postData('category/edit_data',formData)
    if(response.status){
      Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Category Updated successfully',
  
        })
  }
  else{
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })

  }
  fetchAllCategory()
  setOpen(false)
  }

  


  const handleDelete=async()=>{
    var body={categoryid:categoryID,oldicon:oldIcon}
    var response= await postData('category/delete_data',body)
    if(response.status){
      Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Category Deleted successfully',
  
        })
  }
  else{
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })

  }
  fetchAllCategory()
  setOpen(false)
  }







  const showHidePictureButtons=()=>{
    return(<div>
      {buttonStatus.upload?<><Button  fullWidth variant="contained" component="label">
        Upload
        <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
      </Button></>:<><Button onClick={handleSavePicture} color='primary'>Save</Button><Button onClick={handleDiscard} color='secondary'>Discard</Button></>}

    </div>)


  }
    function displayCategories() {
        return (
          <MaterialTable
            title="List of Categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'name', field: 'categoryname' },
              { title: 'Icon', field: 'icon',render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{width:40,height:40}} variant="rounded"/>}
            
            ]}
            data={category}        
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
                onClick: (event) => navigate('/dashboard/category')
              }
            ]}
          />
        )
      }
      const handleClose=()=>{
        setOpen(false)
      }

      const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setButtonStatus(true)

      }




      const showDialog=()=>{
        return(
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
                Category Interface
                </Grid>
                <Grid item xs={12}>
                <TextField value={categoryName} onChange={(event)=>setCategoryName(event.target.value)}  label="Category Name" fullWidth/>    
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
                <Button onClick={handleEditData}variant="contained" fullWidth>
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

        )}
return(
    <div className={classes.dialogmainContainer}>
      <div className={classes.dialogBox}>
        {displayCategories()}
      </div>
      {showDialog()}
    </div>
)



}