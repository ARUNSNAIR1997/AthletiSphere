import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function UserSignup(){

const [getEmail, setEmail] = useState("")
const [getPassword, setPassword] = useState("")
const navigate = useNavigate();

const handleForm = (e)=>{
  e.preventDefault()
  let params = {
    email:getEmail,
    password:getPassword
  }
  // http://localhost:8000/sports/userlogin change this fetch
  fetch(`${process.env.REACT_APP_API_URL}/sports/userlogin`,{
    method:"post",
    headers:{
      Accept:'application/json',
      "Content-Type":"application/json"
    },body:JSON.stringify(params)
  })
  // .then((res)=>res.json()).then((result)=>{
  //   console.log("login successfully",result);
  //   if(result!=="invalid"){
  //     localStorage.setItem("userdata",JSON.stringify(result))
  //     window.location.href="/"
  //   }
  // })
  .then((res)=>res.json()).then((result) => {
  console.log("login result:", result);
  if (result !== "invalid") {
    localStorage.setItem("usertoken", result.token);
    localStorage.setItem("userdata", JSON.stringify(result.user));
    // window.location.href = "/";
    navigate("/");
  }
})

//   .then((res)=>res.json()).then((result) => {
//   console.log("login result:", result);
//   if (result !== "invalid") {
//     localStorage.setItem("usertoken", result.token);
//     localStorage.setItem("userdata", JSON.stringify(result.user));
//     window.location.href = "/";
//   }
// });

// fetch(`${process.env.REACT_APP_API_URL}/sports/userlogin`, {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(params)
// })
//   .then(async (res) => {
//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
//       throw new Error(errorData.message || "Login failed");
//     }
//     return res.json(); // this is where the error was before
//   })
//   .then((result) => {
//     console.log("login result:", result);
//     if (result.token) {
//       localStorage.setItem("usertoken", result.token);
//       localStorage.setItem("userdata", JSON.stringify(result.user));
//       window.location.href = "/";
//     }
//   })
//   .catch((err) => {
//     console.error("Login error:", err.message);
//     alert("Login failed: " + err.message);
//   });

fetch(`${process.env.REACT_APP_API_URL}/sports/userlogin`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(params),
})
  .then(async (res) => {
    const contentType = res.headers.get("Content-Type");
    if (!res.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      } else {
        throw new Error("Non-JSON response");
      }
    }

    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      throw new Error("Expected JSON response, got something else");
    }
  })
  .then((result) => {
    console.log("login result:", result);
    if (result.token) {
      localStorage.setItem("usertoken", result.token);
      localStorage.setItem("userdata", JSON.stringify(result.user));
      // window.location.href = "/";
      navigate("/");
    }
  })
  .catch((err) => {
    // console.error("Login error:", err.message);
    alert("Login failed: " + err.message);
  });

// >>>>>>> eb9237e6592bccf275823534d39bbc03a6a7cee3

}

    return(
        <>
<section className="userlogin vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="sports.png"
                alt="login form" className="img-fluid w-100 vh-100" />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleForm}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-futbol fa-2x me-3"></i>
                    <span className="h1 fw-bold mb-0">Athletisphere</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>

                  <div data-mdb-input-init className="mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" value={getEmail} onChange={(e)=>setEmail(e.target.value)}/>
                    <label className="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div data-mdb-input-init className="mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" value={getPassword} onChange={(e)=>setPassword(e.target.value)}/>
                    <label className="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                  <p className="mb-5 pb-lg-2">Don't have an account? <a href="/userregister"
                      >Register here</a></p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </form>

              </div>
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


export default UserSignup
