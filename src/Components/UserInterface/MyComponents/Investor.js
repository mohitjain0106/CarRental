import Box from '@mui/material/Box';
import React from 'react';
import { Stack } from '@mui/system';
export default function Investor(props) {
    return (

        <div>
            <span style={{ fontWeight: 'bolder', color: '#fff', fontSize: 26 }}>
                Our investors
            </span>
            <Box xs={3} style={{ background: '#fff', display: 'flex', justifyContent: 'space-evenly', borderRadius: 15, height: 220,marginTop:20,width:'99%' }}>
                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <img src='assets/investor1.png' style={{ width: 90 }} />
                        
                        <div>
                            
                            <p style={{ lineHeight: 0.2 }}>Hyundai Motor Company</p>
                            
                            
                        </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <img src='assets/investor2.png' style={{ width: 90 }} />
                        
                        <p style={{ lineHeight: 0.2 }}>Edelweiss Financial Services</p>
                       
                        </div>
                    </div>


                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <img src='assets/investor3.png' style={{ width: 90 }} />
                    
                        <p style={{ lineHeight: 0.2 }}>Dream Incubator</p>
                        
                        </div>
                    </div>

                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <img src='assets/investor4.png' style={{ width: 90 }} />
                        
                        <p style={{ lineHeight: 0.2 }}>Beenext</p>
                        
                        </div>
                    </div>
                </Box>
        </div>

    )

}