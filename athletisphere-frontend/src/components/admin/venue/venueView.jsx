import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../partials/adminNav";


function VenueView(){


const [getView, setView] = useState([])

useEffect(()=>{
    fetch("http://localhost:8000/sports/venueview").then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[])


const handleDelete = (venueId)=>{
    if(window.confirm("Are you sure ?")){
    fetch(`http://localhost:8000/sports/venuedelete/${venueId}`,{
        method: "DELETE"
    }).then((res)=>res.json()).then((result)=>{
        console.log(result);
        
    })
    }
}


    return(
        <>
<AdminNav/>


        <div className="container body-cont">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Venue</h2>
        <Link to="/venue" className="btn btn-outline-primary">
          + Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Sports name</th>
              <th>Venue Name</th>
              <th>Icon</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getView.map((item, index) => (
              <tr key={index}>
                <td>{item.venue_sports?.sports_name}</td>
                <td>{item.venue_name}</td>
                <td><img src={`http://localhost:8000/img/${item.venue_icon}`} width={100} height={100} alt="" /></td>
                <td>
                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-sm btn-warning"
                      to="/venueupdate"
                      state={{ id: item._id }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </>
    )
}


export default VenueView