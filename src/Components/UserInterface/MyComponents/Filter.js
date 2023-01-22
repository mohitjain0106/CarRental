import { List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import { getData } from "../../Services/FetchNodeServices";

export default function Filter(props) {
    const [selectedSegment,setSelectedSegment]=useState({})
    var [segment,setSegment]=useState([])
    var [selectedFuelType,setSelectedFuelType]=useState({})
    const [filterList,setFilterList]=useState({})


    const fetchSegments=async()=>{
        var result=await getData('user/display_company')
        setSegment(result.data)
    }
    useEffect(function(){
        fetchSegments()
    },[])

    const handleSegmentChange=(event)=>{
        var segment=selectedSegment
        if(event.target.checked)
        segment[event.target.value]=event.target.value
        else
        delete segment[event.target.value]
        setSelectedSegment(segment)
        var filter=filterList
        filter={...filter,'segment':segment}
        setFilterList(filter)
        props.filterOperations(filter)
    }

    const handleFuelTypeChange=(event)=>{
        var fuelType=selectedFuelType
        if(event.target.checked)
        fuelType[event.target.value]=event.target.value
        else
        delete fuelType[event.target.value]
        var filter={...filter,'fuel':fuelType}
        setSelectedFuelType(fuelType)
        props.filterOperations(filter)
    }

    const displaySegments=()=>{
        return segment.map((item)=>{
            return(
                <div onChange={handleSegmentChange} key ={item.companyid} style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox value={item.companyid}/> <span>{item.companyname}</span>
                </div>
            )
        })
    }
    return (


        <List style={{ background: '#fff', flexDirection: 'column', display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, marginLeft: 15, marginRight: 10 }}>
                <span>Filter</span>
                <span>Clear All</span>
            </div>
            <div style={{ display: 'flex', flexDirection:'column',padding: 5, marginLeft: 15, marginRight: 10 }}>
            <span>Segment</span>
            {displaySegments()}
            </div>
            <div style={{ display: 'flex', flexDirection:'column',padding: 5, marginLeft: 15, marginRight: 10 }}>
                <span>Fuel Type</span>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox value="Diesel" onChange={handleFuelTypeChange}/> <span>Diesel</span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox value="Petrol" onChange={handleFuelTypeChange} /> <span>Petrol</span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox value="CNG" onChange={handleFuelTypeChange}/> <span>CNG</span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox value="Electric" onChange={handleFuelTypeChange}/> <span>Electric</span>
                </div>

            </div>
            <div style={{ display: 'flex', padding: 5, marginLeft: 15, marginRight: 10,flexDirection:'column' }}>
                <span>Transmission Type</span>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox /> <span>Manual</span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox /> <span>Automatic</span>
                    
                </div>

            </div>
            <div style={{ display: 'flex', padding: 5, marginLeft: 15, marginRight: 10, flexDirection: 'column' }}>
                <span>Seating Capacity</span>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox /> <span>7 Seats</span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox /> <span>5 Seats</span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox /> <span>2 Seats </span>
                </div>
                <div style={{ display: 'flex', marginLeft: 15, alignItems: 'center' }}>
                    <Checkbox /> <span> 4 Seats </span>
                </div>

            </div>
        </List>


    )
}