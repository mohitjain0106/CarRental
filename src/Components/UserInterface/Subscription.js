import Header from "./MyComponents/Header";
import SubscriptionComponent from "./MyComponents/SubscriptionComponent";

export default function Subscription(props){
return(
    <div style={{display:"flex",flexDirection:"column",background:'#dfe6e9'}}>
    <Header/>
    <div>
        <SubscriptionComponent/>
    </div>
    </div>

)


}