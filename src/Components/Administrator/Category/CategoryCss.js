import { makeStyles } from "@mui/styles";
export const useStyles=makeStyles({
mainContainer:{
    display:'flex',
   paddingLeft:'20%',
    
    width:'100vw',
    height:'100vh'
},
box:{
    width:'40%',
    padding:10,
    borderRadius:10,
    
    background:'#fff',
    height:250,

},
headingStyle:{
    fontWidth:24,
    fontWeight:'bold',
    letterSpacing:1,
    paddingTop:5,
    paddingBottom:5,

},
center:{
    display:'flex',
    justifyContent:'left',
    alignItems:'center',

}

})