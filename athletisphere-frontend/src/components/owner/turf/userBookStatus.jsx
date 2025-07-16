import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwnerNav from "../../partials/ownernav";

function UserBookStatus(){

const [getView, setView] = useState([])
const [getOwner, setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))

useEffect(()=>{
    fetch(`http://localhost:8000/sports/bookstatus?turf=${getOwner.Turf_Name}`).then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[])


const handleDelete = (bookId)=>{
  if(window.confirm("Are you sure?")){
    fetch(`http://localhost:8000/sports/bookdelete/${bookId}`,{
      method:"DELETE"
    }).then((res)=>res.json()).then((result)=>{
      console.log("deleted successfully",result);
      setView((prev) => prev.filter((item) => item._id !== bookId));
    })
  }
}

    return(
        <>
<OwnerNav/>

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
              <div className="card h-100 shadow-sm" style={{ backgroundColor: "#C9E6F0" }}>
                <div className="card-header text-center fw-bold fs-5">
                  Turf Name: {item.turf}
                </div>
                <div className="card-body">
                  <p className="mb-1"><strong>Customer Name:</strong> {item.name}</p>
                  <p className="mb-1"><strong>Email:</strong> {item.email}</p>
                  <p className="mb-1"><strong>Phone:</strong> {item.phone}</p>
                  <div className="row row-cols-2 g-2 mt-2">
                    <div className="col"><strong>🏅Sports:</strong> {item.sports}</div>
                    <div className="col"><strong>📅Date:</strong> {item.date}</div>
                    <div className="col"><strong>🕒Time:</strong> {item.time}</div>
                    <div className="col"><strong>⏳Duration:</strong> {item.duration}</div>
                    <div className="col"><strong>👥Persons:</strong> {item.persons}</div>
                    <div className="col"><strong>💰Amount:</strong> ₹{item.total_amount}</div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  {/* <Link className="btn btn-sm btn-warning btn-sm" to="/turfupdate" state={{ id: item._id }}>Edit</Link> */}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
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


export default UserBookStatus