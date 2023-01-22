import React from "react";
import { Divider } from "@mui/material";
import Box from '@mui/material/Box';
export default function FAQ(props) {
    return (
        <div>
            <div>
            <div style={{ display:'flex',fontWeight:'bolder', color: '#fff', fontSize: 28, }}>
                FAQ  </div>
           
            
            </div>
            <Box style={{ width: '96%', height: 420, background: '#fff', borderRadius: 15, padding: 20,marginTop:15}}>
                <div style={{marginTop:10}}>
                    <div>
                        <span style={{fontWeight:'bold',fontSize:20}}>Is there a speed limit?</span>
                        <p style={{color:'#7f8c8d'}}>Revv allows up to 125 km/hr. However it is 80 km/hr in a few cities where some cars might be equipped with speed governors as per government directives. Revv strictly advises to follow local speed limits.</p>
                    </div>
                    <Divider style={{marginBottom:15}} />
                    <div>
                    <span style={{fontWeight:'bold',fontSize:20}}> Can I extend/ cancel/ modify?</span>
                    <p style={{color:'#7f8c8d'}}> Yes, extensions are possible subject to availability & charges. Cancellations & modifications will attract nominal charges as per our policy.</p>
                    </div>
                    <Divider style={{marginBottom:15}} />
                    <div>
                    <span style={{fontWeight:'bold',fontSize:20}}>Booking criteria & documents?</span>
                    <p style={{color:'#7f8c8d'}}>  Min. 21 years old, have valid original government ID (Aadhar, Passport, or PAN only) and a valid driving licence for “Light Motor Vehicles”, which is min. 1 year old at the time of starting the trip.</p>
                    </div>
                    <Divider style={{marginBottom:15}} />
                    <div>
                    <span style={{fontWeight:'bold',fontSize:20}}>Are there any restricted areas?</span>
                    <p style={{color:'#7f8c8d'}}> Leh/Ladhakh, Spiti Valley & Kaza/Nako regions are not permitted to take Revv cars. Customer will be fully liable for any damages incurred to the car in that region.</p>
                    </div>
                </div>
            </Box>
        </div>

    )
}