import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/admin/ownersignup/register'
import RegisterView from './components/admin/ownersignup/registerView'
import RegisterUpdate from './components/admin/ownersignup/registerUpdate'
import AdminNav from './components/partials/adminNav'
import TurfOwner from './components/owner/turf/turfOwner'
import SportsDetails from './components/admin/sports/sports'
import Amenities from './components/admin/amenities/amenities'
import Venue from './components/admin/venue/venue '
import AdminRegister from './components/admin/adminsignup/adminregister'
import AdminLogin from './components/admin/adminsignup/adminLogin'
import AdminHome from './components/admin/adminHome'
import AmenitiesView from './components/admin/amenities/amenitiesView'
import AmenitiesUpdate from './components/admin/amenities/amenitiesUpdate'
import VenueView from './components/admin/venue/venueView'
import VenueUpdate from './components/admin/venue/venueUpdate'
import SportsView from './components/admin/sports/sportsView'
import SportsUpdate from './components/admin/sports/sportsUpdate'
import OwnerLogin from './components/owner/ownerLogin'
import TurfView from './components/owner/turf/turfView'
import TurfUpdate from './components/owner/turf/turfUpdate'
import UserSignup from './components/user/login/userLogin'
import UserRegister from './components/user/login/userRegister'
import UserHome from './components/user/userHome'
import UserNav from './components/partials/usernav'
import OwnerNav from './components/partials/ownernav'
import AllTurf from './components/user/homeComponents/allturf'
import SingleTurf from './components/user/homeComponents/singleturf'
import Booking from './components/user/homeComponents/booking'
import BookingStatus from './components/user/homeComponents/bookingStatus'
import UserBookStatus from './components/owner/turf/userBookStatus'

function App() {

const [getAdmin, setAdmin] = useState(JSON.parse(localStorage.getItem("admindata")))
const [getOwner, setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))
const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))

  return (
    <>
    {/* Admin */}
    <BrowserRouter>
    { getAdmin === null ? (
    <Routes>
    
    <Route path='/adminregister' element={<AdminRegister/>}/>
    <Route path='/adminlogin' element={<AdminLogin/>}/>
    
    
    </Routes>
    ) : getAdmin.role === "admin" ? (
      <Routes>
    <Route path='/' element={<AdminHome/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/registerview' element={<RegisterView/>}/>
    <Route path='/registerupdate' element={<RegisterUpdate/>}/>
    <Route path='/adminnav' element={<AdminNav/>}/>
    <Route path='/sports' element={<SportsDetails/>}/>
    <Route path='/amenities' element={<Amenities/>}/>
    <Route path='/venue' element={<Venue/>}/>
    <Route path='/amenitiesview' element={<AmenitiesView/>}/>
    <Route path='/amenitiesupdate' element={<AmenitiesUpdate/>}/>
    <Route path='/venueview' element={<VenueView/>}/>
    <Route path='/venueupdate' element={<VenueUpdate/>}/>
    <Route path='/sportsview' element={<SportsView/>}/>
    <Route path='/sportsupdate' element={<SportsUpdate/>}/>
      </Routes>
    ) : ''
    }
    </BrowserRouter>


    {/* Owner */}
    <BrowserRouter>
    { getOwner === null ? (
    <Routes>
      <Route path='/ownerlogin' element={<OwnerLogin/>}/>
    </Routes>
    ) : getOwner.role === "owner" ? (
      <Routes>
      <Route path='/turf' element={<TurfOwner/>}/>
      <Route path='/' element={<TurfView/>}/>
      <Route path='/turfupdate' element={<TurfUpdate/>}/>
      <Route path='/ownernav' element={<OwnerNav/>}/>
      <Route path='/bookstatus' element={<UserBookStatus/>}/>
      </Routes>
      ) : ''
    }
    </BrowserRouter>


    {/* user */}
    <BrowserRouter>
    { getUser === null ? (
    <Routes>
      <Route path='/userlogin' element={<UserSignup/>}/>
      <Route path='/userregister' element={<UserRegister/>}/>
      <Route path='/usernav' element={<UserNav/>}/>
    </Routes>
    ) : getUser.role === "user" ? (
      <Routes>
      <Route path='/' element={<UserHome/>}/>
      <Route path='/allturf' element={<AllTurf/>}/>
      <Route path='/singleturf/:turfId' element={<SingleTurf/>}/>
      <Route path='/booking/:turfId' element={<Booking/>}/>
      <Route path='/bookingstatus' element={<BookingStatus/>}/>
      </Routes>
      ) : ''
    }
    </BrowserRouter>
    </>
  )
}

export default App
