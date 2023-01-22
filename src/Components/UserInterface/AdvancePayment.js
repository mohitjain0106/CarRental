import React from "react";
import Header from "./MyComponents/Header";
import Paper from '@mui/material/Paper'
import GroupsIcon from '@mui/icons-material/Groups';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import { useSelector } from "react-redux";
import { ServerURL } from "../Services/FetchNodeServices";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function AdvancePayment(props) {
    var [check,setCheck]=React.useState('')
    var dispatch=useDispatch()
    var vehicle=useSelector((state)=>state.vehicle);
    var vehicleDetails=Object.values(vehicle)[0];
    
   
    var navigate=useNavigate()
    
    
const handleClick=()=>{
   
   
    navigate("/vehicledetailcomponent")
    

}




  
    
    return (
        <div  style={{ background: "rgb(241, 241, 241)",height:'100vh'}}>
            <Header />
            
                <div style={{ display: 'flex', justifyContent:'center',alignItems:'center',height:'80vh' }}>
            <Paper style={{ display: 'flex', width: '60vw', height: '50vh', border: '2px solid ', paddingLeft: 10, paddingRight: 5, justifyContent: 'space-evenly',flexDirection:'row' }}>
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ fontSize: 22, fontWeight: 650 }}>{vehicleDetails.modelname} {vehicleDetails.companyname}</span>
                    <img src={`${ServerURL}/images/${vehicleDetails.icon}`} style={{ width: 250, padding: '0px 10px 0px 10px' }} />
                    <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 15 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', paddingRight: 15, alignItems: 'center' }}><GroupsIcon style={{ color: 'rgb(14, 186, 186)', width: 20 }} /><span style={{ fontSize: 10 }}>{vehicleDetails.capacity} seats</span></div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 15, alignItems: 'center' }}><SettingsInputComponentIcon style={{ color: 'rgb(14, 186, 186)', width: 20 }} /><span style={{ fontSize: 10 }}>Manual</span></div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 15, alignItems: 'center' }}><LocalGasStationIcon style={{ color: 'rgb(14, 186, 186)', width: 20 }} /><span style={{ fontSize: 10 }}>{vehicleDetails.fueltype}</span></div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 10px 0px 10px', alignItems: 'center', marginTop: 15 }}>

                    <div style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                        <span>ADVANCE BOOKING DETAILS</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10,alignItems:'center' }}>
                                <span style={{ fontSize: 16, padding: 10 }}>Doorstep delivery & pickup</span>
                                <span style={{ fontSize: 16, padding: 10 }}>&#x20B9; 400<Checkbox  defaultChecked /></span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10 ,alignItems:'center'}}>
                                <span style={{ fontSize: 16, padding: 10 }}>Refundable security deposit</span>
                                <span style={{ fontSize: 16, padding: 10 }}>&#x20B9; 2000<Checkbox  defaultChecked /></span>
                             </div>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                        <span>If You Select Delivery Money & security Money </span>
                        <span>It Will Added to Total Money</span>
                        </div>



                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center',padding:10 }}>
                    <Button onClick={handleClick} variant="contained" size="small" style={{ height: 32, width: 50 }} >
                                Proceed
                            </Button>
                            </div>
                </div>


            </Paper>
            
            </div>
            </div>
        
    )
}