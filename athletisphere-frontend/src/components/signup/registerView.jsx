import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function RegisterView(){

const [getView, setView] = useState([])



//signup view
useEffect(()=>{
    fetch("http://localhost:8000/sports/registerview").then((res)=>res.json()).then((result)=>{
        console.log("fetched files",result);
        setView(result)
    })
},[])



//delete
const handleDelete = (loginId)=>{
    if(window.confirm("Are you sure?")){
        fetch(`http://localhost:8000/sports/registerdelete/${loginId}`,{
            method:"DELETE"
        }).then((res)=>res.json()).then((result)=>{
            console.log(result);
            
        })
    }
}




    return(
        <>

<div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Admin</h2>
        <Link to="/register" className="btn btn-outline-primary">
          + Register
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Other Phone</th>
              <th>Address</th>
              <th>District</th>
              <th>State</th>
              <th>Country</th>
              <th>Pin</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getView.map((item, index) => (
              <tr key={index}>
                <td>{item.regId?.Turf_Name}</td>
                <td>{item.regId?.Phone}</td>
                <td>{item.regId?.Other_Number}</td>
                <td>{item.regId?.Address}</td>
                <td>{item.regId?.District}</td>
                <td>{item.regId?.State}</td>
                <td>{item.regId?.Country}</td>
                <td>{item.regId?.Pincode}</td>
                <td>{item.Email}</td>
                <td>{item.Password}</td>
                <td>
                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-sm btn-warning"
                      to="/registerupdate"
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


export default RegisterView