import React from "react";
import Box from '@mui/material/Box';
export default function PlayStore(props) {
    return (
        <div>
            <Box style={{ height: 350, background: '#fff', borderRadius: 15, width: '99%',marginTop:20 }}>
                <div style={{ position:'relative',color:'#7f8c8d', fontSize: 28, fontWeight: "bolder",display:'flex',justifyContent:'center', }}>
                    <div style={{position:'absolute' ,left:'15%',top:70 }}>
                        <div style={{padding:25}}>
                        Download the Revv app
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around",alignItems:'center' }}>
                            <div>
                                <img src="assets/appstore.png" width="200px" />
                            </div>
                            <div>
                                <img src="assets/playstore.png" width="200px" />
                            </div>
                        </div>
                    </div>

                    <div style={{position:'absolute',left:'55%',top:76 }}>
                        <img src='assets/mob.png' style={{ width: 450 }} />
                    </div>
                </div>

            </Box>

        </div>
    )
}