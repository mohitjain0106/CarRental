import Box from '@mui/material/Box';
import React from 'react';
import { Stack } from '@mui/system';
export default function OurJourney(props) {
    return (
        <>
            <div>
                <span style={{ fontWeight: 'bolder', color: '#fff', fontSize: 24 }}>
                    Our Journey so Far
                </span>
                <Box xs={3} style={{ background: '#fff', display: 'flex', justifyContent: 'space-evenly', borderRadius: 15, height: 220,marginTop:20,width:'99%' }}>
                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <img src='assets/fixcomponent1.png' style={{ width: 75 }} />
                        
                        <div>
                            
                            <h2 style={{ lineHeight: 0.2 }}>1 Mn +</h2>
                            <p>Happy Customer</p>
                            
                        </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <img src='assets/fixcomponent2.png' style={{ width: 75 }} />
                        
                        <h2 style={{ lineHeight: 0.2 }}>22+ cities</h2>
                        <p>Across India</p>
                        </div>
                    </div>


                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <img src='assets/fixcomponent3.png' style={{ width: 75 }} />
                    
                        <h2 style={{ lineHeight: 0.2 }}>50 Mn +</h2>
                        <p>Kms travelled</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', padding: 10, justifyContent: 'center', marginTop: 25 }}>
                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <img src='assets/fixcomponent4.png' style={{ width: 75 }} />
                        
                        <h2 style={{ lineHeight: 0.2 }}>4.8 / 5</h2>
                        <p>20K+ reviewers</p>
                        </div>
                    </div>
                </Box>
            </div>
        </>

    )

}