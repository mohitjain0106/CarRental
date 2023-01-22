import AdminLogin  from "./Components/Administrator/Administrator/AdminLogin";
import Dashboard from "./Components/Administrator/Administrator/Dashboard";

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./Components/UserInterface/Home";
import Subscription from "./Components/UserInterface/Subscription";
import VehicleDetails from "./Components/UserInterface/VehicleDetails";
import VehicleDetailComponent from "./Components/UserInterface/VehicleDetailComponent";
import PaymentGateway from "./Components/UserInterface/PaymentGateway"
import AdvancePayment from "./Components/UserInterface/AdvancePayment";
function App() {
  return (
    <div >
   <Router>
    <Routes>
      <Route element={<Home/>} path="/home"/>
      <Route element={<AdminLogin/>} path="/adminlogin"/>
      <Route element={<Dashboard/>} path="/dashboard/*"/>
      <Route element={<Subscription/>} path="/subscription"/>
      <Route element={<VehicleDetails/>} path="/vehicledetails"/>
      <Route element={<VehicleDetailComponent/>}path='/vehicledetailcomponent'/>
      <Route element={<PaymentGateway/>}path='/paymentgateway'/>
      <Route element={<AdvancePayment/>}path='/advancepayment'/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
