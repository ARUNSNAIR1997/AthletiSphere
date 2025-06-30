import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../partials/usernav";


function SocialPost(){

const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))
const [getText, setText] = useState("")
const [getImages, setImages] = useState("")
const navigate = useNavigate()

const handlePost = ()=>{
    const formData = new FormData();
    formData.append("userId",getUser._id)
    formData.append("profile",getUser.profile)
    formData.append("name",getUser.firstname)
    formData.append("caption",getText)
    formData.append("images",getImages)

  fetch("http://localhost:8000/sports/socialpost",{
    method:"post",
    body:formData
  }).then((res)=>res.json()).then((result)=>{
    console.log("inserted",result);
    navigate("/")
  })

}


    return(
        <>

<UserNav/>

<div className="container body-cont">

    <div className="mb-5">
      <h3 className="mb-3 border-bottom pb-2"></h3>
        <div className="row g-4">
            <div className="col">
              <div className="card h-100 shadow-sm" style={{ backgroundColor: "#C9E6F0" }}>
                <div className="card-header text-center fw-bold fs-5">
                  Post
                </div>
                <div className="card-body">
                <div className="pb-3">
                    <img src={`http://localhost:8000/img/${getUser.profile}`} alt="" width={50} height={50}/>&nbsp;&nbsp;
                    <label htmlFor="">{getUser.firstname}</label>
                </div>
                  <textarea className="posttext" placeholder="What's on your mind?" value={getText} onChange={(e)=>setText(e.target.value)}></textarea>
                  {/* <p className="mb-1"><strong>Photo/Video:</strong> </p> */}
                  <div className="row row-cols-2 g-2 mt-2">
                    <div className="col"><strong><i class="fa-solid fa-images"></i>&nbsp;Photo/Video:</strong> <input type="file" id="getImages" onChange={(e)=>setImages(e.target.files[0])} /> </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-center">
                  <button className="btn btn-success btn-sm" onClick={handlePost}>POST</button>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>

        </>
    )
}



export default SocialPost