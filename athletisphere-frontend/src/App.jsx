import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/signup/register'
import RegisterView from './components/signup/registerView'
import RegisterUpdate from './components/signup/registerUpdate'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/registerview' element={<RegisterView/>}/>
    <Route path='/registerupdate' element={<RegisterUpdate/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
