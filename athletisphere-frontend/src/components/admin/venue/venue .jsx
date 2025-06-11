import React, { useState } from "react";
import AdminNav from "../../partials/adminNav";
import { useNavigate } from "react-router-dom";


function Venue(){

const navigate = useNavigate()
const [getName, setName] = useState("")
const [getIcon, setIcon] = useState("")

const handleForm = (e)=>{
  e.preventDefault()
  let formdata = new FormData()
  formdata.append("venue_name",getName)
  formdata.append("venue_icon",getIcon)
  fetch("http://localhost:8000/sports/venue",{
    method:"post",
    body: formdata
  }).then((res)=>res.json()).then((result)=>{
    console.log("venue inserted",result);
    navigate("/venueview")
  })
}


    return(
        <>

{/* nav */}
<AdminNav/>

        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body venue-cont">
              <h2 className="card-title text-center mb-4">Venue</h2>
              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="amenityName" className="form-label">Venue Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="getName"
                    placeholder="Enter the amenity name"
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amenityIcon" className="form-label">Upload Venue Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    id="getIcon"
                    onChange={(e)=>setIcon(e.target.files[0])}
                  />
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


export default Venue