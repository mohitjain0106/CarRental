import {React,useState } from "react";
import Header from "./MyComponents/Header";
import Paper from '@mui/material/Paper'
import { Divider } from "@material-ui/core";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Cities from "./MyComponents/Cities";
import { useSelector } from "react-redux";
import { ServerURL } from "../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
    
export default function VehicleDetailComponent(props) {
    var navigate=useNavigate()
    var vehicle=useSelector((state)=>state.vehicle);
    console.log('vehicle',vehicle)
    var vehicleDetails=Object.values(vehicle)[0];
    console.log('details',vehicleDetails)

    var pickup=400
    var sdeposit=2000 
    var total=pickup+sdeposit+vehicleDetails.rent
    var bookingDetails=useSelector((state)=>state.booking)
    console.log('endtime',Object.values(bookingDetails.endtime))
    var st= Object.values(bookingDetails.starttime)[2]
    var std=st.toDateString()
    var stt=st.getHours()+ ':'+st.getMinutes()+':'+st.getSeconds()
    var et= Object.values(bookingDetails.endtime)[2]
    var etd=et.toDateString()
    var ett=et.getHours()+ ':'+et.getMinutes()+':'+et.getSeconds()
    return (
        <div style={{ background: "rgb(241, 241, 241)" }}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-evenly' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Paper style={{ display: 'flex', width: '60vw',height:'40vh', border: '2px solid ', paddingLeft: 10, paddingRight: 10, justifyContent: 'space-evenly' }}>
                        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontSize: 22, fontWeight: 650 }}>{vehicleDetails.modelname} {vehicleDetails.companyname}</span>
                            <img src={`${ServerURL}/images/${vehicleDetails.icon}`} style={{ width: 250, padding: '0px 10px 0px 10px' }} />
                            <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 15 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', paddingRight: 15 ,alignItems:'center'}}><GroupsIcon style={{ color: 'rgb(14, 186, 186)', width: 20 }} /><span style={{ fontSize: 10 }}>{vehicleDetails.capacity} seats</span></div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 15,alignItems:'center' }}><SettingsInputComponentIcon style={{ color: 'rgb(14, 186, 186)', width: 20 }} /><span style={{ fontSize: 10 }}>Manual</span></div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 15,alignItems:'center' }}><LocalGasStationIcon style={{ color: 'rgb(14, 186, 186)', width: 20 }} /><span style={{ fontSize: 10 }}>{vehicleDetails.fueltype}</span></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 10px 0px 10px', alignItems: 'center', marginTop: 15 }}>

                            <div style={{ display: "flex", alignItems: "center", flexDirection: 'row' }}>
                                <span>BOOKING DETAILS</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ padding: '10px 0px 10px 0px' }}>
                                   {std+' '+stt}
                                </div>
                                <div><img src="/assets/toIcon.svg" style={{ padding: '10px 20px 0px 20px' }} /></div>
                                <div style={{ padding: '10px 0px 10px 0px' }}>
                                {etd+' '+ett}
                                </div>
                            </div>
                            <div style={{ marginTop: 5 }}>
                                <span style={{ display: 'flex', justifyContent: 'center' }}><AccessTimeIcon style={{ paddingRight: 5, color: 'rgb(14, 186, 186)', width: 20 }} />{bookingDetails.duration}</span>
                            </div>
                            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ fontSize: 12, fontWeight: 'bold', paddingRight: 5 }}>City: {bookingDetails.city}</div>
                                <div style={{ fontSize: 12, paddingLeft: 5 }}>Change City</div>
                            </div>
                            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                                <span style={{ fontSize: 12, fontWeight: 'bold', paddingRight: 5 }}>Pricing Plan: Includes 182 kms, excludes fuel</span>
                                <span style={{ fontSize: 12, paddingLeft: 5 }}>Change Plan</span>

                            </div>


                        </div>


                    </Paper>
                    <Paper style={{ display: 'flex', width: '60vw',height:'60vh', border: '2px solid ', paddingLeft: 10, paddingRight: 10, justifyContent: 'space-evenly', flexDirection: 'column', marginTop: 10 }}>
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                            <span style={{ fontSize: 15, fontWeight: 600 }}>IMPORTANT POINTS TO REMEMBER</span>
                        </div>
                        <div style={{ marginTop: 20, display: 'flex' }}>
                            <table>
                                <tr>
                                    <td style={{ padding: 10, fontSize: 12, width: '25%' }}>CHANGE IN PRICING PLAN:</td>
                                    <td style={{ padding: 10, fontSize: 12 }}>The pricing plan (7 kms/hr, without fuel) cannot be changed after the booking is made</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 10, fontSize: 12 }}>FUEL:</td>
                                    <td style={{ padding: 10, fontSize: 12 }}>In case you are returning the car at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 10, fontSize: 12 }}>TOLLS, PARKING, INTER-STATE TAXES:</td>
                                    <td style={{ padding: 10, fontSize: 12 }}>To be paid by you.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 10, fontSize: 12 }}>ID VERIFICATION:</td>
                                    <td style={{ padding: 10, fontSize: 12 }}>Please keep your original Driving License handy. While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory. In the unfortunate case where you cannot show these documents, we will not be able to handover the car to you, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 10, fontSize: 12 }}>PRE-HANDOVER INSPECTION:</td>
                                    <td style={{ padding: 10, fontSize: 12 }}>Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</td>
                                </tr>
                            </table>
                        </div>
                    </Paper>
                </div>
                
                <div style={{padding:'0px 5px 0px 5px'}}>
                    <Paper style={{ display: 'flex', width: '30vw', border: '2px solid ', paddingLeft: 10, paddingRight: 10, flexDirection: 'column', }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{marginTop:15}}>
                                <span>FARE DETAILS</span>
                            </div>
                            <div>
                                <table>
                                    <tr style={{ width: '100%' }}>
                                        <td style={{ padding: 10, fontSize: 12, width: '75%' }}>Base fare</td>
                                        <td style={{ padding: 10, fontSize: 12 }}>  &#x20B9; {vehicleDetails.rent}</td>
                                    </tr>
                                    <tr style={{ width: '100%' }}>
                                        <td style={{ padding: 10, fontSize: 12, width: '75%' }}>Doorstep delivery & pickup</td>
                                        <td style={{ padding: 10, fontSize: 12 }}> &#x20B9; {pickup} </td>
                                    </tr>
                                    <tr style={{ width: '100%' }}>
                                        <td style={{ padding: 10, fontSize: 12, width: '75%' }}>Insurance & GST</td>
                                        <td style={{ padding: 10, fontSize: 12 }}> Included</td>
                                    </tr>
                                    <tr style={{ width: '100%' }}>
                                        <td style={{ padding: 10, fontSize: 12, width: '75%' }}>Refundable security deposit</td>
                                        <td style={{ padding: 10, fontSize: 12 }}> &#x20B9; {sdeposit}</td>
                                    </tr>
                                    
                                </table>
                            </div>
                        
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',padding:5 }}>
                            <TextField id="standard-basic" label="Promo code" variant="standard" />
                            <Button variant="contained" size="small" style={{ height: 32, width: 50, padding: 10 }} > Small</Button>
                            </div>
                        </div>
                            <div>
                            <Divider style={{marginTop:10}}/>
                            


                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0px 5px 0px', flexDirection: 'row' }}>
                            <span style={{ fontSize: 18, fontWeight: 600, paddingLeft: 15 }}>Total:</span>
                            <span style={{ fontSize: 18, fontWeight: 600, paddingRight: 25 }}>&#x20B9; {total}</span>
                        </div>
                        <Divider/>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                <span style={{ fontSize: 12, padding: 10 }}>Kms limit</span>
                                <span style={{ fontSize: 12, padding: 10 }}>Fuel</span>
                                <span style={{ fontSize: 12, padding: 10 }}>Extra kms charge</span>
                                <span style={{ fontSize: 12, padding: 10 }}>Tolls, Parking & Inter-state taxes</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 10px 10px 25px' }}>
                                <span style={{ fontSize: 12, padding: 10 }}>1446 kms</span>
                                <span style={{ fontSize: 12, padding: 10 }}>Excluded</span>
                                <span style={{ fontSize: 12, padding: 10 }}>9/km</span>
                                <span style={{ fontSize: 12, padding: 10 }}>To be paid by you</span>

                            </div>
                        </div>
                        <div>
                            <TextField id="standard-basic" label="Delivery location" variant="standard" fullWidth />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, padding: 10, fontWeight: 500 }}>Return car to a different location in same city</span>
                            <Switch />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center',padding:10 }}>
                            <Button onClick={()=>navigate("/paymentgateway")} variant="contained" size="small" style={{ height: 32, width: 50 }} >
                                Proceed
                            </Button>
                        </div>
                    </div>
                </Paper>
                </div>
            </div>
            <div style={{padding:5}}>
            <Cities />
            </div>
        </div>
        
    

    )
}