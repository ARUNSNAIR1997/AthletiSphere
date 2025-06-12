import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../partials/adminNav";

function SportsView(){


const [getView, setView] = useState([])

useEffect(()=>{
    fetch("http://localhost:8000/sports/sportsview").then((res)=>res.json()).then((result)=>{
        console.log("viewed",result);
        setView(result) 
    })
},[])


const handleDelete = (sportsId)=>{
    if(window.confirm("Are you sure?")){
        fetch(`http://localhost:8000/sports/sportsdelete/${sportsId}`,{
            method: "DELETE"
        }).then((res)=>res.json()).then((result)=>{
            console.log("deleted",result);
            // Remove the deleted item from the view
        setView((prev) => prev.filter((item) => item._id !== sportsId));
        })
    }
}


    return(
        <>
<AdminNav/>

        <div className="container body-cont">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Sports</h2>
        <Link to="/sports" className="btn btn-outline-primary">
          + Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Sports Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getView.map((item, index) => (
              <tr key={index}>
                <td>{item.sports_name}</td>
                <td><img src={`http://localhost:8000/img/${item.sports_image}`} width={100} height={100} alt="" /></td>
                <td>{item.sports_despt}</td>
                <td>
                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-sm btn-warning"
                      to="/sportsupdate"
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


export default SportsView