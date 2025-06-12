import React, { useState } from "react";
import AdminNav from "../../partials/adminNav";
import { useNavigate } from "react-router-dom";


function SportsDetails(){

const navigate = useNavigate()

const [getName, setName] = useState("")
const [getImage, setImage] = useState("")
const [getDespt, setDespt] = useState("")

const handleForm = (e)=>{
e.preventDefault()
let formdata = new FormData()
formdata.append("sports_name",getName)
formdata.append("sports_image",getImage)
formdata.append("sports_despt",getDespt)
fetch("http://localhost:8000/sports/sports",{
  method:"post",
  body: formdata
}).then((res)=>res.json()).then((result)=>{
  console.log(result);
  navigate("/sportsview")
})
}


    return(
        <>
{/* nav */}
<AdminNav/>


        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm sports-cont">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sports Details</h2>
              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="sportsName" className="form-label">Sports Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="getName"
                    placeholder="Enter the sports name"
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sportsIcon" className="form-label">Upload Sports Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    id="getImage"
                    onChange={(e)=>setImage(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sportsDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="getDespt"
                    rows="4"
                    placeholder="Enter the sports description"
                    onChange={(e)=>setDespt(e.target.value)}
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}


export default SportsDetails