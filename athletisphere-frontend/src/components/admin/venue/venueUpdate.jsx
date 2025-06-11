import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VenueUpdate(){

    const [getName, setName] = useState("")
    const [getIcon, setIcon] = useState("")

const location = useLocation()
const venueId = location.state?.id;
console.log("venue",venueId);

const navigate = useNavigate()

useEffect(()=>{
    if(venueId){
        fetch(`http://localhost:8000/sports/venueedit/${venueId}`).then((res)=>res.json()).then((result)=>{
            console.log("output",result);
            setName(result.venue_name)
            setIcon(result.venue_icon)
        })
    }
},[])





    return(
        <>
        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body venue-cont">
              <h2 className="card-title text-center mb-4">Venue</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="amenityName" className="form-label">Venue Name</label>
                  <input
                    type="text"
                    className="form-control"
                    // id="getName"
                    value={getName}
                    placeholder="Enter the amenity name"
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amenityIcon" className="form-label">Upload Venue Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    // id="getIcon"
                    onChange={(e)=>setIcon(e.target.files[0])}
                  />
                  <img src={typeof getIcon === "string"
                    ? `http://localhost:8000/img/${getIcon}`
                    : URL.createObjectURL(getIcon)
                   } width={100} height={100} alt="" />
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


export default VenueUpdate