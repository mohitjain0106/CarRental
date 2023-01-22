import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    var navigate=useNavigate()
    return (
        <div>
  <React.Fragment>
   
    
    <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displaycompany')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Company" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displaymodel')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Model" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayvehicle')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicle" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/featureinterface')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Feature" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/offer')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Offers" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/whypnpinterface')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="whyPNP" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

  </React.Fragment>



  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
  </div>
    )
}