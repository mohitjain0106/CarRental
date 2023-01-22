import Header from "./MyComponents/Header"
import SearchComponent from "./MyComponents/SearchComponent"
import FeaturedComponent from "./MyComponents/FeaturedComponent"
import OfferComponent from "./MyComponents/OfferComponent"
import WhyComponent from "./MyComponents/WhyComponent"
import { getData } from "../Services/FetchNodeServices"
import { useEffect,useState } from "react"
import Cities from "./MyComponents/Cities"
import OurJourney from "./MyComponents/OurJourney"
import FAQ from "./MyComponents/FAQ"
import Investor from "./MyComponents/Investor"
import Playstore from "./MyComponents/Playstore"
import Footer from "./MyComponents/Footer"
export default function Home(props){
    const [features,setFeatures]=useState([])

    const getAllFeature=async()=>{
        var result= await getData('user/all_feature')
        setFeatures(result.data)
    }
    useEffect(function(){
        getAllFeature()

    },[])

return (
    <div style={{display:"flex",flexDirection:"column",background:'#dfe6e9'}}>
        <Header/>
        <div style={{margin:0}}>
            <SearchComponent/>
            
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{width:'90%'}}>
            <FeaturedComponent title='Featured' images={features}/>
        </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <OfferComponent title="Offers"/>
          </div>
          </div> 
          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <WhyComponent title="Why Us?"/>
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <Playstore/>
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <OurJourney/>
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <FAQ/>
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <Investor/>
          </div>
          </div> 
           

          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <Cities/>
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <Footer/>
          </div>
          </div> 
           
        
    </div>


)

}