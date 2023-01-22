
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import SideBar from './Sidebar';
import Category from "../Category/Category"
import DisplayAllCategory from "../Category/DisplayAllCategory";
import DisplayAllSubCategory from "../Subcategory/DisplayAllSubCategory";
import SubCategory from "../Subcategory/SubCategory";
import Company from "../Company/Company";
import { DisplayCompany } from "../Company/DisplayCompany";
import Model from "../Model/Model";
import { DisplayModel } from "../Model/DisplayModel";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Vehicle from "../Vehicle/Vehicle";
import { DisplayVehicle } from "../Vehicle/DisplayVehicle";
import FeatureInterface from '../Featured/FeatureInterface';
import Offer from "../Offer/Offer"
import DisplayAllOffer from "../Offer/DisplayAllOffer";
import WhypnpInterface from "../WhyPnp/WhyInterface"

export default function Dashboard() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        PaynRent
                    </Typography>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <div style={{ padding: 5, paddingleft: 5, display: 'flex', width: 200, justifyContent: 'center', alignItems: 'center' }} >
                        <img src='/assets/defaultcar.png' style={{ width: 100 }} />
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={10}>
                    <Routes>
                        <Route element={<Category />} path="/category" />
                        <Route element={<DisplayAllCategory />} path="/displayallcategory" />
                        <Route element={<SubCategory />} path="/subcategory" />
                        <Route element={<DisplayAllSubCategory />} path="/displayallsubcategory" />
                        <Route element={<Company />} path="/company" />
                        <Route element={<DisplayCompany />} path="/displaycompany" />
                        <Route element={<Model />} path="/model" />
                        <Route element={<DisplayModel />} path="/displaymodel" />
                        <Route element={<Vehicle />} path="/vehicle" />
                        <Route element={<DisplayVehicle />} path="/displayvehicle" />
                        <Route element={<FeatureInterface />} path="/featureinterface" />
                        <Route element={<WhypnpInterface />} path="/whypnpinterface" />
                        <Route element={<DisplayAllOffer />} path="/displayalloffer" />
                        <Route element={<Offer />} path="/offer" />
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    );
}
