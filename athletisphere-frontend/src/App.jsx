import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/admin/ownersignup/register'
import RegisterView from './components/admin/ownersignup/registerView'
import RegisterUpdate from './components/admin/ownersignup/registerUpdate'
import AdminNav from './components/partials/adminNav'
import TurfOwner from './components/owner/turfOwner'
import SportsDetails from './components/admin/sportsDetails'
import Amenities from './components/admin/amenities/amenities'
import Venue from './components/admin/venue/venue '
import AdminRegister from './components/admin/adminsignup/adminregister'
import AdminLogin from './components/admin/adminsignup/adminLogin'
import AdminHome from './components/admin/adminHome'
import AmenitiesView from './components/admin/amenities/amenitiesView'
import AmenitiesUpdate from './components/admin/amenities/amenitiesUpdate'
import VenueView from './components/admin/venue/venueView'
import VenueUpdate from './components/admin/venue/venueUpdate'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/registerview' element={<RegisterView/>}/>
    <Route path='/registerupdate' element={<RegisterUpdate/>}/>
    <Route path='/adminnav' element={<AdminNav/>}/>
    <Route path='/turf' element={<TurfOwner/>}/>
    <Route path='/sports' element={<SportsDetails/>}/>
    <Route path='/amenities' element={<Amenities/>}/>
    <Route path='/venue' element={<Venue/>}/>
    <Route path='/adminregister' element={<AdminRegister/>}/>
    <Route path='/adminlogin' element={<AdminLogin/>}/>
    <Route path='/' element={<AdminHome/>}/>
    <Route path='/amenitiesview' element={<AmenitiesView/>}/>
    <Route path='/amenitiesupdate' element={<AmenitiesUpdate/>}/>
    <Route path='/venueview' element={<VenueView/>}/>
    <Route path='/venueupdate' element={<VenueUpdate/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
