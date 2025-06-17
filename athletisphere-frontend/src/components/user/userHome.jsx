import React, {useState, useEffect} from "react";
import UserNav from "../partials/usernav";


function UserHome(){

const [getSports, setSports] = useState([])

//sports
useEffect(()=>{
    fetch("http://localhost:8000/sports/sportsview").then((res)=>res.json()).then((result)=>{
        console.log("viewed",result);
        setSports(result) 
    })
},[])

    return(
        <>

<UserNav/>

<div className="container body-cont">

        <div>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="cards-wrapper">
        {getSports.map((item, index)=>(
      <div class="card" key={index}>
        <img src={`http://localhost:8000/img/${item.sports_image}`} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">{item.sports_name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
        ))}
    </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
        </div>

</div>
        </>
    )
}

export default UserHome