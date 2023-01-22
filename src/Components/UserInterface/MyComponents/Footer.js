import React from "react";
import Grid from '@mui/material/Grid';
export default function Footer(props){
    return(
        <Grid  item xs={12} container spacing={2} style={{background:'#fff',width:'99%',height:400,borderRadius:15,display:'flex',padding:15,justifyContent:'center'}}>
            <Grid item xs={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src="assets/logo3.png" style={{width:250,height:100}}/>
                
            </Grid>
            <Grid item xs={4} style={{display:'flex',justifyContent:'center',position:'relative'}}>
                <span style={{alignItems:'center',position:'absolute',top:'10%'}}>
                <p>Home</p>
                <p>FAQ</p>
                <p>Policy</p>
                <p>Blog</p>
                </span>
            </Grid>
            <Grid item xs={4} style={{display:'flex',justifyContent:'center'}}>
                <img src="assets/logo3.png" style={{width:250,height:100}}/>
            </Grid>
        </Grid>
    )
}