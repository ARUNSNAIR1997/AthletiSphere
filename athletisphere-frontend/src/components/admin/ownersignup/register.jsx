import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../partials/adminNav";


function Register(){

const navigate = useNavigate()


const [getName, setName] = useState("")
const [getPhone, setPhone] = useState("")
const [getNextPhone, setNextPhone] = useState("")
const [getAddress, setAddress] = useState("")
const [getDistrict, setDistrict] = useState("")
const [getState, setState] = useState("")
const [getCountry, setCountry] = useState("")
const [getPin, setPin] = useState("")
const [getEmail, setEmail] = useState("")
const [getPassword, setPassword] = useState("")


const handleForm = (e)=>{
    e.preventDefault()
    let params = {
        Turf_Name:getName,
        Phone:getPhone,
        Other_Number:getNextPhone,
        Address:getAddress,
        District:getDistrict,
        State:getState,
        Country:getCountry,
        Pincode:getPin,
        Email:getEmail,
        Password:getPassword
    }
    fetch("http://localhost:8000/sports/register",{
        method:"post",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
        console.log("registered",result);
        navigate("/registerview")
    })
}



    return(
        <>

{/* navbar */}
<AdminNav/>

        <div className="body-cont container">
    <div className="register">
        <article className="register-body mx-auto">
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <p className="text-center">Get started with your free account</p>
            <form onSubmit={handleForm}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                 </div>
                <input name="" className="form-control ms-1" placeholder="Turf name" type="text" required value={getName} onChange={(e)=>setName(e.target.value)}/>
            </div>
            
            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="Phone number" type="text" required value={getPhone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>

             <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="Other Phone number" type="text" required value={getNextPhone} onChange={(e)=>setNextPhone(e.target.value)}/>
            </div>

            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="Address" type="text" required value={getAddress} onChange={(e)=>setAddress(e.target.value)}/>
            </div>

            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i class="fa-solid fa-building-circle-arrow-right"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="District" type="text" required value={getDistrict} onChange={(e)=>setDistrict(e.target.value)}/>
            </div>

            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i class="fa-solid fa-location-dot"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="State" type="text" required value={getState} onChange={(e)=>setState(e.target.value)}/>
            </div>
            
            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i class="fa-solid fa-globe"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="Country" type="text" required value={getCountry} onChange={(e)=>setCountry(e.target.value)}/>
            </div>

            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i class="fa-solid fa-address-card"></i> </span>
                </div>
                <input name="" className="form-control ms-1" placeholder="Pincode" type="text" required value={getPin} onChange={(e)=>setPin(e.target.value)}/>
            </div>

             <div className="form-group input-group mt-2" >
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                 </div>
                <input name="" className="form-control ms-1" placeholder="Email" type="email" required value={getEmail} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="form-group input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                </div>
                <input className="form-control ms-1" placeholder="Create password" type="password"  required value={getPassword} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
            </div>    
            <p className="text-center mt-2">Have an account? <a href="">LogIn</a> </p>                                                                 
        </form>
        </article>
        </div>
    </div>
        </>
    )
}


export default Register