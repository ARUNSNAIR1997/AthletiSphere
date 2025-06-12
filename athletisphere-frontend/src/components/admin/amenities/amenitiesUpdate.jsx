import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../../partials/adminNav";


function AmenitiesUpdate(){

const [getName, setName] = useState("")
const [getIcon, setIcon] = useState("")
const navigate = useNavigate()
const location = useLocation()

const amenitieId = location.state?.id;
console.log("amenitie id",amenitieId);

useEffect(()=>{
    if(amenitieId){
        fetch(`http://localhost:8000/sports/amenitiesedit/${amenitieId}`)
        .then((res)=>res.json()).then((result)=>{
            console.log("output",result);
            setName(result.amenitie_name)
            setIcon(result.amenitie_icon)
        })
    }
},[])



const handleForm = (e)=>{
  e.preventDefault()
  let formdata = new FormData()
  formdata.append("id", amenitieId);
  formdata.append("amenitie_name",getName)
//   formdata.append("amenitie_icon",getIcon)
// If a new image is selected
  if (typeof getIcon === "object") {
    formdata.append("amenitie_icon", getIcon);
  } else {
    formdata.append("existingAmenitie_icon", getIcon); // fallback to old image name
  }
  fetch("http://localhost:8000/sports/amenitiesupdate",{
    method:"POST",
    body: formdata
  }).then((res)=>res.json()).then((result)=>{
    console.log("amenities inserted",result);
    navigate("/amenitiesview")
  })
}



    return(
        <>
<AdminNav/>


        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body amenities-cont">
              <h2 className="card-title text-center mb-4">Amenities</h2>
              <form onSubmit={handleForm} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="amenityName" className="form-label">Amenity Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={getName}
                    placeholder="Enter the amenity name"
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amenityIcon" className="form-label">Upload Amenity Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    // value={getIcon}
                    onChange={(e)=>setIcon(e.target.files[0])}
                  />
                  {/* <img src={`http://localhost:8000/img/${getIcon}`} width={100} height={100} alt="" /> */}
                  <img src={ typeof getIcon === "string"
      ? `http://localhost:8000/img/${getIcon}`
      : URL.createObjectURL(getIcon) } width={100} height={100} alt=""/>

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


export default AmenitiesUpdate