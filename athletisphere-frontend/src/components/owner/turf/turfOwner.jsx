import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerNav from "../../partials/ownernav";


function TurfOwner(){

const navigate = useNavigate()

const [getSports, setSports] = useState([])
const [getVenue, setVenue] = useState([])
const [getAmenities, setAmenities] = useState([])
const [getImages, setImages] = useState([])
const [getPrice, setPrice] = useState("")
const [selectedSport, setSelectedSport] = useState(""); // for sport
const [selectedVenues, setSelectedVenues] = useState([]);
const [selectedAmenities, setSelectedAmenities] = useState([]);

const [getOwner,setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))

//sports
useEffect(()=>{
    fetch("http://localhost:8000/sports/sportsview").then((res)=>res.json()).then((result)=>{
        console.log("viewed",result);
        setSports(result) 
    })
})

//venue
useEffect(()=>{
    fetch("http://localhost:8000/sports/venueview").then((res)=>res.json()).then((result)=>{
        console.log(result);
        setVenue(result)
    })
},[])


//amenities
useEffect(()=>{
    fetch("http://localhost:8000/sports/amenitiesview").then((res)=>res.json()).then((result)=>{
        console.log("viewed",result);
        setAmenities(result)
    })
},[])




//insert
const handleSubmit = (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("sports",selectedSport)
  formData.append("price",getPrice)
  formData.append("owner",getOwner._id)
  formData.append("location",getOwner.District)
formData.append("turf_name", getOwner?.Turf_Name || getOwner?.regId?.Turf_Name || "Default Name");



selectedVenues.forEach(id => formData.append("venues[]", id));
selectedAmenities.forEach(id => formData.append("amenities[]", id));
getImages.forEach(file => formData.append("images", file));


  fetch("http://localhost:8000/sports/turf",{
    method:"post",
    body:formData
  }).then((res)=>res.json()).then((result)=>{
    console.log("inserted",result);
    navigate("/")
  })
}


    return(
        <>
<OwnerNav/>

<div className="container py-5">
  <div className="row justify-content-center">
    <div className="col-md-10 col-lg-8 body-cont">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create Turf Details</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">

              {/* Sport Type */}
              <div className="col-md-6 mb-3">
                <label htmlFor="sportType" className="form-label">Sport Type</label>

                <select className="form-select" required onChange={(e) => setSelectedSport(e.target.value)} value={selectedSport}>
                <option value="">Select sport</option>
                {getSports.map((item) => (
                <option key={item._id} value={item._id}>{item.sports_name}</option>
                ))}
                </select>


              </div>

              {/* Price */}
              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">Price Per Person</label>
                <input type="number" className="form-control" id="price" placeholder="Enter price" value={getPrice}
                onChange={(e) => setPrice(e.target.value)} />
              </div>
              
            </div>

        

            <div className="row">
              {/* Image Upload */}
              <div className="col-md-6 mb-3">
                <label htmlFor="image" className="form-label" id="getImages">Image</label>
                <input type="file" className="form-control" id="image" multiple onChange={(e)=>setImages([...e.target.files])}/>
              </div>

              {/* You can use this space for another field or leave it blank */}
              <div className="col-md-6 mb-3">
                {/* Placeholder for additional input or spacing */}
              </div>
            </div>


              <div className="row">

              {/* Venue */}
              <div className="col-md-6 mb-3">
  <label className="form-label">Venue</label>
  {getVenue.map((item) => (
    <div className="form-check" key={item._id}>
      <input
        className="form-check-input"
        type="checkbox"
        id={`venue-${item._id}`}
        value={item._id}
        onChange={(e) => {
          const { value, checked } = e.target;
          setSelectedVenues((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value)
          );
        }}
        checked={selectedVenues.includes(item._id)}
      />
      <label className="form-check-label" htmlFor={`venue-${item._id}`}>
        {item.venue_name}
      </label>
    </div>
  ))}
</div>


              {/* Amenities */}
              <div className="col-md-6 mb-3">
  <label className="form-label">Amenities</label>
  {getAmenities.map((item) => (
    <div className="form-check" key={item._id}>
      <input
        className="form-check-input"
        type="checkbox"
        // id={`amenity-${item._id}`}
        value={item._id}
        onChange={(e) => {
          const { value, checked } = e.target;
          setSelectedAmenities((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value)
          );
        }}
        checked={selectedAmenities.includes(item._id)}
      />
      <label className="form-check-label">
        {item.amenitie_name}
      </label>
    </div>
  ))}
</div>


            </div>


            {/* Submit Button */}
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">Submit</button>
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



export default TurfOwner