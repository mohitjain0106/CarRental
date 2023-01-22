import { useState,useEffect,createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ServerURL } from "../../Services/FetchNodeServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function FeaturedComponent(props){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:false
      };
      var myslider=createRef()
var images=props.images
 
const playSlide=()=>{
    return images.map((item)=>{
        return(
        <div style={{paddingLeft:10,paddingRight:10}}>
        <img src={`${ServerURL}/images/${item.image}`} style={{borderRadius:20,width:280,height:170}}/>
        </div>)
    })
}

const handleClickLeft=()=>{
    myslider.current.slickPrev()

}

const handleClickRight=()=>{
myslider.current.slickNext()

}

return(
    <div>
     <div style={{display:'flex',justifyContent:'space-between',paddingBottom:10,paddingTop:10,width:'96%'}}>
        <span style={{fontWeight:'bolder',fontSize:24,color:'#fff'}}>{props.title}</span>
        <span><KeyboardArrowLeftIcon style={{fontSize:34}} onClick={handleClickLeft}/> <KeyboardArrowRightIcon style={{fontSize:34}} onClick={handleClickRight}/></span>
     </div>
        <Slider ref={myslider} {...settings}>
            {playSlide()}
        </Slider>
    </div>


    )


}