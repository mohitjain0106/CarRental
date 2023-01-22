import { useEffect,useState } from "react";
import { Button } from "@material-ui/core";
import { ServerURL } from "../../Services/FetchNodeServices";
import UserSignUpDrawer from "./UserSignUpDrawer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function VehicleComponent(props){
    var bookingDetails=useSelector(state=>state.booking)
   var item=props.item
   var [status,setStatus]=useState(false)
   var dispatch=useDispatch()
   
   const handleClick=(item)=>{
    var rent=(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*bookingDetails.hours)
    item ['rent']=rent
    dispatch({type:'ADD_VEHICLE',payload:[item.vehicleid,item]})
    setStatus(true)
   }
   const handleStatus=()=>{
    setStatus(false)
   }
    return(
        <div style={{width:250,display:'flex',background:'#fff',padding:10,borderRadius:20,flexDirection:'column'}}>
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <img src={`${ServerURL}/images/${item.icon}`} width="60%"/> 
            </div>
            <div style={{display:'flex',flexDirection:'column',padding:10}}>
                <div style={{colot:'#59646f',fontSize:11,fontWeight:600}}>
                    {item.companyname}
                </div>
                <div style={{fontSize:14,fontWeight:600,color:'#122232',marginTop:4}}>
                    {item.modelname}
                </div>
                <div style={{display:'flex',flexDirection:'row',fontSize:12,marginTop:10,fontFamily:'Poppins',fontWeight:400,color:'#59646f'}}>
                    <div><span style={{marginRight:3}}><img src='assets/iconDiesel.svg'/></span>{item.fueltype}</div>
                    <div><span style={{marginLeft:7}}><img src='assets/iconTransmission.svg'/></span>Manual</div>
                    <div><span style={{marginLeft:7}}><img src='assets/iconSeat.svg'/></span>{item.capacity} seats</div>
                </div>
                <div style={{display:'flex',flexDirection:'row',marginTop:8,height:30,alignItems:'baseline',justifyContent:'space-between'}}>
                
                <div>
                    <span style={{fontSize:22,fontWeight:'bolder',marginRight:5}}> &#8377;</span>
                <span style={{fontSize:28,fontWeight:'bolder'}}>{(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*bookingDetails.hours)}</span>
                </div>
                <div>
                <span>
                    <Button onClick={()=>handleClick(item)} variant="conatained" style={{background: 'linear-gradient(270deg,#1caba2, 20%,#1c7fab)'}}>Book &gt;</Button>

                </span>
                </div>
                </div>
                <div style={{display:'flex', flexDirection:'row',marginTop:15}}>
                <span style={{fontSize:12,color:'#59646f'}}>
                    Prices <b>exclude</b> fuel cost
                    </span> 
                </div>
            </div>
            <UserSignUpDrawer status={status} handleStatus={handleStatus}/>
        </div>
    )

}