import React, { useState } from "react";
import AdminNav from "../../partials/adminNav";


function AdminRegister(){


const [getName, setName] = useState("")
const [getEmail, setEmail] = useState("")
const [getPassword, setPassword] = useState("")


const handleForm = (e)=>{
 e.preventDefault()
 let params= {
    name:getName,
    email:getEmail,
    password:getPassword,
    userStatus:"admin"
 }
 fetch("http://localhost:8000/sports/adminregister",{
    method:"post",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(params)
 }).then((res)=>res.json()).then((result)=>{
    console.log("admin registered",result);
    
 })
}


    return(
        <>

{/* nav */}
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
                <input name="" className="form-control ms-1" placeholder="Admin name" type="text" required value={getName} onChange={(e)=>setName(e.target.value)}/>
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



export default AdminRegister