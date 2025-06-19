import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function SingleTurf(){

const { turfId } = useParams()

const [turf, setTurf] = useState(null)

useEffect(()=>{
    fetch(`http://localhost:8000/sports/turfedit/${turfId}`).then((res)=>res.json()).then((result)=>{
        console.log("Fetched turf:",result);
        setTurf(result)
    })
},[turfId])

if (!turf || !turf.images || turf.images.length === 0) {
    return <div>Loading...</div>;
  }

    return(
        <>
<div className="container body-cont">

<div
  id="carouselBasicExample"
  data-mdb-carousel-init class="carousel slide carousel-fade"
  data-mdb-ride="carousel"
  data-mdb-interval="3000" // <-- Auto-slide every 3 seconds
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



  {/* Carousel images */}
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
              {/* <div className="carousel-caption d-none d-md-block">
                <h5 style={{color: "black"}}>{turf.turf_name}</h5>
              </div> */}
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
<button className="book">Book a game</button>
</div>
</div>

</div>
        </>
    )
}



export default SingleTurf