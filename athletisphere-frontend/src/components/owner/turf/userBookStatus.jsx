import React, { useEffect, useState } from "react";

function UserBookStatus(){

const [getView, setView] = useState([])
const [getOwner, setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))

useEffect(()=>{
    fetch(`http://localhost:8000/sports/bookstatus?turf=${getOwner.Turf_Name}`).then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[])


    return(
        <>
        <div className="container body-cont">
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {getView.map((item, index) => (
  <div className="allturf col" key={index}>
    <div className="card" style={{backgroundColor: "#C9E6F0"}}>
     
            {/* <img src={`http://localhost:8000/img/${img?.[0]}`} width={100} height={300} className="card-img-top" alt="..." style={{objectFit: "cover"}}/> */}
    <h1 className="text-center">Turf name : {item.turf}</h1>
      <div className="card-body">
        <div class="card-title">Customer name: {item.name}</div>
        <div class="card-title">Customer email: {item.email}</div>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">Date: {item.date}</div>
          <div className="col">Time: {item.time}</div>
          <div className="col">Duration: {item.duration}</div>
          <div className="col">No.Person: {item.persons}</div>
        </div>
        <div className="text-center pt-2">Total amount: {item.total_amount}</div>
      </div>
    </div>
  </div>
  ))}
{/* <p>{turf.turf_name}</p> */}
</div>
</div>
        </>
    )
}


export default UserBookStatus