import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import {Button,TextField,Grid} from '@mui/material';
import {ServerURL,postData,getData} from '../../Services/FetchNodeServices'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function UserSignUpDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [value, setValue] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [mobile,setMobile]=React.useState('')
  const [userName,setUserName]=React.useState('')
  const [aadhar,setAadhar]=React.useState('')
  const [license,setLicense]=React.useState('')
  const [dob,setDob]=React.useState('')
  var dispatch=useDispatch()
  var navigate=useNavigate()
 React.useEffect(function(){
    setState({ ...state, ['right']: props.status });
 
 },[props]) 


 const fetchUserDetails=async()=>{
  var result=await postData('user/check_user_mobile_number',{mobilenumber:props.mobile})
  dispatch({type:'ADD_USER',payload:[props.mobile,result.data]})
  
}



const handleSubmit=async()=>{
  var body={mobilenumber:props.mobile,emailid:emailAddress,fullname:userName,birthdate:dob,aadharnumber:aadhar,licenseno:license}
  var result=await postData('user/submituserdetails',body)
  if(result.status){
    alert('successfully registered')
    setState({ ...state, ['right']: false });
    fetchUserDetails()
    navigate('/vehicledetailcomponent')
  }
  else{
    alert('registration failed')
  }
}


 
 
   const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.handleStatus(open)
    setState({ ...state, ['right']: open });
  };

  const list = (anchor) => (
    <Grid container spacing={3} style={{width:400,padding:30}}>
    <Grid item xs={12}>
    <img src='/assets/logo1.png' style={{width:70,padding:3}} />
    </Grid>
    <Grid item xs={12} style={{textAlign:'center',width:24,fontFamily:'Poppins',fontWeight:700}}>
        Sign Up
    </Grid> 
    <Grid item xs={12}>
     <TextField onChange={(event)=>setUserName(event.target.value)}  variant='outlined' fullWidth label={<span style={{width:24,fontFamily:'Poppins',fontWeight:700}}>User Name</span>}></TextField>
    </Grid>   
    <Grid item xs={12}>
     <TextField value={props.mobile} onChange={(event)=>setMobile(event.target.value)} variant='outlined' fullWidth label={<span style={{width:24,fontFamily:'Poppins',fontWeight:700}}>Mobile Number</span>}></TextField>
    </Grid>
    <Grid item xs={12}>
     <TextField onChange={(event)=>setEmailAddress(event.target.value)}  variant='outlined' fullWidth label={<span style={{width:24,fontFamily:'Poppins',fontWeight:700}}>Email Address</span>}></TextField>
    </Grid>
    <Grid item xs={12}>
     <TextField onChange={(event)=>setAadhar(event.target.value)}  variant='outlined' fullWidth label={<span style={{width:24,fontFamily:'Poppins',fontWeight:700}}>Aadhar Number</span>}></TextField>
    </Grid>
    <Grid item xs={12}>
     <TextField onChange={(event)=>setLicense(event.target.value)}  variant='outlined' fullWidth label={<span style={{width:24,fontFamily:'Poppins',fontWeight:700}}>Driving License</span>}></TextField>
    </Grid>
    <Grid item xs={12}>
     <TextField type='date' onChange={(event)=>setDob(event.target.value)}  variant='outlined' fullWidth label={<span style={{width:24,fontFamily:'Poppins',fontWeight:700}}>Date of Birth</span>}></TextField>
    </Grid>

    <Grid item xs={12}>
     <Button  variant='contained' onClick={handleSubmit}  style={{background:'linear-gradient(270deg,#1caba2, 20%,#1c7fab)'}} fullWidth >Proceed</Button>   
    </Grid>
    
   
    </Grid>
    );

  return (
    <div>
      
        <React.Fragment key={'right'}>
          
          <Drawer
            anchor={'right'}
            open={state.right}
            onClose={toggleDrawer('right', false)}
            
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
    
    </div>
  );
}
