import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ServerURL ,getData } from '../../Services/FetchNodeServices';
import Box from '@mui/material/Box';
import { LocationOn } from "@mui/icons-material";
import DateDiff from "date-diff";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
import {Dialog,DialogContent,DialogTitle,IconButton} from '@mui/material';
import { Divider,TextField } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';


export default function SecondHeader(Props){
  var navigate=useNavigate()
    var [open,setOpen]=useState(false)
    var [cities,setCities]=useState([])
    var bookingDetails=useSelector(state=>state.booking)
    var [selectedCity,setSelectedCity]=useState(bookingDetails.city)
    var [startTime,setStartTime]=useState(bookingDetails.starttime)
    const [endTime, setEndTime] = useState(bookingDetails.endtime)
    const [days,setDays]=useState('')
    const [daysTime,setDaysTime]=useState('')
    const [hours,setHours]=useState('')
    var dispatch=useDispatch()
    
    
  console.log('booking',bookingDetails.starttime)
    const fetchAllCities = async () => {
      var response = await getData('user/display_all_cities')
      setCities(response.data)
    }
    useEffect(function () {
      fetchAllCities()
    }, [])

    const handleCityDialog=()=>{
        setOpen(true)

    }

    const handleCitySelect = (cityselected) => {
        setSelectedCity(cityselected)
        setOpen(false)
      }

      const handleClick=()=>{
        if( (days>=0 && hours>0)|| (days>0 && hours>=0)){
        dispatch({type:'ADD_BOOKING',payload:{city:selectedCity,starttime:startTime,endtime:endTime,duration:daysTime,days:days,hours:hours}})
        navigate('/vehicledetails')
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Invalid Date & Time',
           
          })
        }
       
      }



      const dateDiff=(endTime)=>{
        var startDay =new Date(startTime)
        var endDay= new Date (endTime)
      
        var diff = new DateDiff(endDay, startDay);
        setDays(parseInt(diff.days()))
        setHours(Math.ceil(diff.hours()%24))
        setDaysTime("Duration "+parseInt(diff.days())+" Days "+Math.ceil(diff.hours()%24)+"Hrs")
      }

      const handleClose=()=>{
        setOpen(false)
      }


      const showTopCity = () => {
        return cities.map((item) => {
          return (<>
            {item.status == 'Top City' ?
              <ListItem button >
                <ListItemText primary={<span style={{fontSize:18,fontWeight:'bold'}}>{item.cityname}</span>} onClick={() => handleCitySelect(item.cityname)} />
              </ListItem> : <></>
            }</>)
    
        })
      }


      const showOtherCity = () => {
        return cities.map((item) => {
          return (<>
            {item.status == 'Other City' ?
              <ListItem button >
                <ListItemText style={{ fontSize: 18, fontWeight: "bold" }} primary={item.cityname} onClick={() => handleCitySelect(item.cityname)} />
              </ListItem> : <></>
            }</>)
    
        })
      }
      const cityDialog = () => {
        return (
          <div>
    
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                style:{borderRadius:20}
              }}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} >
                {"Select your city"}
    
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: -145,
                    top: 4,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon/>
                </IconButton>
    
              </DialogTitle>
              <Divider/>
              <DialogContent style={{ width:300}}>
                <List>
                  <div>Top Cities</div>
                  {showTopCity()}
                  <Divider/>
                  <div>Other Cities</div>
                  {showOtherCity()}
                </List>
              </DialogContent>
    
            </Dialog>
          </div>
        );
    
      }

      const handleSetStartTimeValue=(newValue)=>{
  
  
        setStartTime(newValue)
      }
      const handleSetEndTimeValue=(newValue)=>{
        setEndTime(newValue)
       dateDiff(newValue)
      }
      


    return(
        <div style={{background:'#fff'}}>
        
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft:15,
        paddingLeft:0
      }}
    >
        <span style={{marginTop:5,fontWeight:600}}>Modify Search</span>
    <ButtonGroup variant="outlined" aria-label="outlined button group" style={{height:50,margin:'0px 0px 10px 0px'}}>
    <Button onClick={handleCityDialog}><LocationOn/>{selectedCity} <KeyboardArrowDownIcon/></Button>
    <Button style={{width:140}}> 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDateTimePicker
      InputProps={{
        disableUnderline:true,
      }}
        label={<span style={{fontSize:14,color:'#7f8c8d'}}>Start Time</span>}
        value={startTime}
        onChange={(newValue) =>{ handleSetStartTimeValue(newValue)}}
        renderInput={(params) => <TextField variant="standard"{...params}/>}
      />
      </LocalizationProvider> <KeyboardArrowDownIcon/>
      </Button >
    <Button style={{width:140}}><LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDateTimePicker
      InputProps={{
        disableUnderline:true,
      }}
        label={<span style={{fontSize:14,color:'#7f8c8d'}}>End Time</span>}
        value={endTime}
        onChange={(newValue) =>{ handleSetEndTimeValue(newValue)}}
        renderInput={(params) => <TextField variant="standard"{...params}/>}
      />
      </LocalizationProvider> <KeyboardArrowDownIcon/></Button>
      <div>
      <Button style={{width:130,height:50,borderRadius:10,marginLeft:20,background:'linear-gradient(270deg,#1caba2, 20%,#1c7fab)'}}>
      <span onClick={handleClick}style={{fontSize:11,fontWeight:'bolder',color:'#fff'}}>Modify Search</span>
      </Button>
      </div>
      
    </ButtonGroup> 
    
      

    
  </Box>
  {cityDialog()}
  </div>

    )
}