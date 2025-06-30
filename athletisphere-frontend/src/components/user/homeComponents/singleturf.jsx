import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserCricket from "../score/userCricket";
import UserFootball from "../score/userFootball";
import UserNav from "../../partials/usernav";
import Footer from "../../partials/footer";



function SingleTurf(){

const navigate = useNavigate()

const { turfId } = useParams()

const [turf, setTurf] = useState(null)
const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))

useEffect(()=>{
    fetch(`http://localhost:8000/sports/turfedit/${turfId}`).then((res)=>res.json()).then((result)=>{
        console.log("Fetched turf:",result);
        setTurf(result)
    })
},[turfId])





const [getView, setView] = useState([])
const [selectedSport, setSelectedSport] = useState(null)
    
    useEffect(()=>{

      if (!turf) return;
        fetch("http://localhost:8000/sports/sportsview").then((res)=>res.json()).then((result)=>{
            console.log("viewed",result);
            setView(result) 

  
        const match = result.find((sport) => sport._id === turf?.sports._id);
        console.log("match",match);
        
        setSelectedSport(match);
        })
    },[turf])


  if (!selectedSport) {
    return <p className="text-center mt-5">Loading or invalid sport...</p>;
  }






    return(
        <>
<UserNav/>

{selectedSport?.sports_name === "Football" && <UserFootball />}
{selectedSport?.sports_name === "Cricket" && <UserCricket />}

<div className="container body-cont">

<div
// 
id="carouselBasicExample"
  className="carousel slide carousel-fade"
  data-mdb-ride="carousel"
  data-mdb-interval="3000"
>

  <div class="carousel-indicators">
    {turf.images.map((_, index) => (
    <button data-mdb-button-init
    key={index}
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to={index}
      className={index === 0 ? "active" : ""}
    aria-current={index === 0 ? "true" : undefined}
    aria-label={`Slide ${index + 1}`}
    ></button>
 ))}
  </div>



 
        <div className="carousel-inner">
          {turf.images.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={`http://localhost:8000/img/${img}`}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ height: "500px", objectFit: "cover" }}
              />
           
            </div>
          ))}
        </div>

  <button data-mdb-button-init
    class="carousel-control-prev"
    type="button"
    data-mdb-target="#carouselBasicExample"
    data-mdb-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button data-mdb-button-init
    class="carousel-control-next"
    type="button"
    data-mdb-target="#carouselBasicExample"
    data-mdb-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div className="row pt-3">
<div className="col">
<div style={{fontSize: "30px"}}>
    {turf.turf_name}
</div>
<div style={{fontSize: "20px"}}>
{turf.sports?.sports_name}
</div>
</div>
<div className="col text-end">
<button className="book" onClick={() => navigate(`/booking/${turfId}`)}>Book a game</button>
</div>
</div>

<hr />
{/* address */}
<div>
  <p style={{fontSize: "30px"}}>Address</p>
  <div className="pb-2"><i class="fa-solid fa-location-dot"></i>&nbsp; {turf.owner?.Address}, {turf.owner?.District}, {turf.owner?.State}</div>
  <div><i class="fa-solid fa-mobile-screen"></i>&nbsp; {getUser.firstnumber}</div>
</div>

<hr />
{/* venue */}
<div>
  <p style={{fontSize: "30px"}}>Venue Info</p>
 {turf.venues.map((item, index) => (
  <div key={index}>
    <div className="pb-3"><img src={`http://localhost:8000/img/${item.venue_icon}`} width={30} height={30} alt="" /> &nbsp;   {item.venue_name}</div>
   
  </div>
))}
</div>

<hr />
{/* amenity */}
<div>
  <p style={{fontSize: "30px"}}>Amenities</p>
  {turf.amenities.map((item, index)=>(
    <div key={index}>
      <div className="pb-3"><img src={`http://localhost:8000/img/${item.amenitie_icon}`} width={30} height={30} alt="" /> &nbsp;   {item.amenitie_name}</div>
      </div>
  ))}
</div>

</div>

<Footer/>
        </>
    )
}



export default SingleTurf