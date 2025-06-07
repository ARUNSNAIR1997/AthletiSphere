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
import Amenities from './components/admin/amenities'
import Venue from './components/admin/venue '

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
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
