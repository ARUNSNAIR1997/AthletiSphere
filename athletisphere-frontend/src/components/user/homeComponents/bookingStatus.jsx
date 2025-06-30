import React, { useEffect, useState } from "react";
import UserNav from "../../partials/usernav";



function BookingStatus(){

const [getView, setView] = useState([])
const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))

useEffect(()=>{
    fetch(`http://localhost:8000/sports/bookingview?user=${getUser._id}`).then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[])



    return(
        <>

<UserNav/>


<div className="container body-cont">
  {Object.entries(
    getView.reduce((grouped, booking) => {
      if (!grouped[booking.date]) {
        grouped[booking.date] = [];
      }
      grouped[booking.date].push(booking);
      return grouped;
    }, {})
  ).map(([date, bookings]) => (
    <div key={date} className="mb-5">
      <h3 className="mb-3 border-bottom pb-2">📅 Bookings on {date}</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {bookings.map((item, index) => (
          <div className="col" key={index}>
            <div className="card" style={{ backgroundColor: "#C9E6F0" }}>
              <h5 className="text-center p-2">Turf: {item.turf}</h5>
              <div className="card-body">
                <div className="mb-1"><strong>Name:</strong> {item.name}</div>
                <div className="mb-1"><strong>Email:</strong> {item.email}</div>
                <div className="mb-1"><strong>Phone:</strong> {item.phone}</div>
                <div className="row row-cols-1 row-cols-md-2 mt-2">
                  <div className="col">🏅 Sports: {item.sports}</div>
                  <div className="col">🕒 Time: {item.time}</div>
                  <div className="col">⏳ Duration: {item.duration} hr</div>
                  <div className="col">👥 Persons: {item.persons}</div>
                  <div className="col">💰 Amount: ₹{item.total_amount}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>


        </>
    )
}


export default BookingStatus;