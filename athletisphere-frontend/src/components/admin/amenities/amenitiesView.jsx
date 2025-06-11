import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AmenitiesView(){


const [getView, setView] = useState([])

//view
useEffect(()=>{
    fetch("http://localhost:8000/sports/amenitiesview").then((res)=>res.json()).then((result)=>{
        console.log("viewed",result);
        setView(result)
    })
},[])

//delete
const handleDelete = (amenitieId)=>{
    if(window.confirm("Are you Sure?")){
        fetch(`http://localhost:8000/sports/amenitiesdelete/${amenitieId}`,{
            method:"DELETE"
        }).then((res)=>res.json()).then((result)=>{
            console.log(result);
            
        })
    }
}

    return(
        <>
        <div className="container body-cont">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Amenities</h2>
        <Link to="/amenities" className="btn btn-outline-primary">
          + Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Amenitie Name</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            {getView.map((item, index) => (
              <tr key={index}>
                <td>{item.amenitie_name}</td>
                <td><img src={`http://localhost:8000/img/${item.amenitie_icon}`} width={100} height={100} alt="" /></td>
                <td>
                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-sm btn-warning"
                      to="/amenitiesupdate"
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



export default AmenitiesView