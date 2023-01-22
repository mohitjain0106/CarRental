import { useEffect,useState } from "react";
import VehicleComponent from "./MyComponents/VehicleComponent";
import {Divider} from '@mui/material'
import {ServerURL,getData} from "../Services/FetchNodeServices"
import Header from "./MyComponents/Header"
import SecondHeader from "./MyComponents/SecondHeader";
import Filter from "./MyComponents/Filter";
import { Grid } from "@mui/material";
export default function VehicleDetails(props){
    const [vehicleList,setVehicleList]=useState([])
    const [tempVehicleList,setTempVehicleList]=useState([])
    const fetchAllVehicle=async()=>{
        var result=await getData('user/display_vehicle')
        setVehicleList(result.data)
        setTempVehicleList(result.data)
    }
    
    const segmentFilter=(ids)=>{
       var models=Object.values(ids?.segment?ids.segment:{} ) 
       var fuel=Object.values(ids?.fuel?ids.fuel:{} )
       var segment_str=''
       var i
        ////model

       if(models.length>0)
       {

   
       for ( i=0;i<models.length;i++){
        segment_str= segment_str+"item.companyid==="+models[i]+" || "
        }
        segment_str= segment_str.substring(0, segment_str.lastIndexOf('||')-1)
        }

        alert('segment:'+segment_str)
        ////fuel
        var fuel_str=''
if(fuel.length>0)  
{
for( i=0;i<fuel.length;i++){
   fuel_str= fuel_str+"item.fueltype==='"+fuel[i]+"' || "
   } 

   fuel_str=fuel_str.substring(0,fuel_str.lastIndexOf('||')-1)
}

alert("Fuel:"+fuel_str)

var final_query=''
if(segment_str!='')
{
  final_query=final_query+segment_str+ " && "
}


if(fuel_str!='')
{
  final_query=final_query+fuel_str+ " || "
}

if(fuel_str==='')
final_query=final_query.substring(0,final_query.lastIndexOf('&&')-1)
else
final_query=final_query.substring(0,final_query.lastIndexOf('||')-1)


alert(final_query)

var temp=tempVehicleList.filter((item)=>{
   return eval(final_query)
    })


    setVehicleList(temp)
  
  

        
    }

    const filterOperations=(parameter)=>{
        segmentFilter(parameter)

    }
    useEffect(function(){
        fetchAllVehicle()
    },[])
    const listVehicle=()=>{
        return vehicleList.map((item)=>{
            return (<div style={{padding:5,margin:5}}>
                <VehicleComponent item={item} />
            </div>)
        })
    }
    return(
       
        
        <div  style={{background:'#ecf0f1',display:'flex',flexDirection:'column',}}>
            <div>
                <Header/>
            </div>
            <Divider/>
             <div>
        <SecondHeader/>
        </div>
        <Grid container spacing={1}>
            <Grid item xs={3}>
            <Filter filterOperations={filterOperations}/>
            </Grid>
        <Grid item xs={9}>
            <div style={{margin:20,display:'flex',flexWrap:'wrap'}}>
        {listVehicle()}
        </div>
        </Grid>
        </Grid>
        </div>
    )
}