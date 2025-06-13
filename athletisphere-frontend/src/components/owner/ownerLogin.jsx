import React, { useState } from "react";


function OwnerLogin(){


const [getEmail, setEmail] = useState("")
const [getPassword, setPassword] = useState("")


const handleForm = (e)=>{
    e.preventDefault()
    let params={
        Email:getEmail,
        Password:getPassword
    }
    fetch("http://localhost:8000/sports/ownerlogin",{
        method:"post",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
        console.log("login successfully",result);
        if(result!=="invalid"){
            localStorage.setItem("ownerdata",JSON.stringify(result))
            window.location.href="/turf"
        }
    })
}


    return(
        <>
        <section className="vh-100">
  <div className="ownerlogin container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">

        <div className="px-5 ms-xl-4">
          <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
          <span className="h1 fw-bold mb-0">Logo</span>
        </div>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form onSubmit={handleForm}>

            <h3 className="fw-normal mb-3 pb-3">Log in</h3>

            <div data-mdb-input-init class="form-outline mb-4">
              <input type="email" id="getEmail" className="form-control form-control-lg" onChange={(e)=>setEmail(e.target.value)}/>
              <label className="form-label" for="form2Example18">Email address</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="getPassword" className="form-control form-control-lg" onChange={(e)=>setPassword(e.target.value)}/>
              <label className="form-label" for="form2Example28">Password</label>
            </div>

            <div className="pt-1 mb-4">
              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block" type="submit">Login</button>
            </div>

            <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p>

          </form>

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src="sports.png"
          alt="Login image" className="w-100 vh-100"/>
      </div>
    </div>
  </div>
</section>
        </>
    )
}


export default OwnerLogin