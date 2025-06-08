import React, { useState } from "react";
import AdminNav from "../../partials/adminNav";


function AdminLogin(){


const [getEmail, setEmail] = useState("")
const [getPassword, setPassword] = useState("")


const handleForm = ()=>{
    let params={
        email:getEmail,
        password:getPassword
    }
    fetch("http://localhost:8000/sports/adminlogin",{
        method:"post",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
        console.log("login successfull",result);
        if(result!=="invalid"){
            localStorage.setItem("admindata",JSON.stringify(result))
            window.location.href="/"
        }
    })
}


    return(
        <>

{/* nav */}
<AdminNav/>


        <section class="vh-100 gradient-custom body-cont">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card adminlogin-cont text-black">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-black-50 mb-5">Please enter your login and password!</p>

              <div data-mdb-input-init class="form-outline form-black mb-4">
                <input type="email" id="typeEmailX" class="form-control form-control-lg" value={getEmail} onChange={(e)=>setEmail(e.target.value)}/>
                <label class="form-label" for="typeEmailX">Email</label>
              </div>

              <div data-mdb-input-init class="form-outline form-black mb-4">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" value={getPassword} onChange={(e)=>setPassword(e.target.value)}/>
                <label class="form-label" for="typePasswordX">Password</label>
              </div>

              <p class="small mb-5 pb-lg-2"><a class="text-black-50" href="#!">Forgot password?</a></p>

              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-lg px-5" type="submit" onClick={handleForm}>Login</button>
            </div>

            <div>
              <p class="mb-0">Don't have an account? <a href="#!" class="text-black-50 fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}


export default AdminLogin