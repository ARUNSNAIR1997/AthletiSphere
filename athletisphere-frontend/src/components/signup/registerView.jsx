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
        <div className="container userbook text-center position-relative">
    
<div>
    {/* <Link to="/bookform" className="btn btn-outline-primary">Add Books</Link> */}
</div>

<div className="text-center text-decoration-underline fs-3 fw-bold fst-italic text-primary">Books</div>

<div>
    <table className="table table-striped table-bordered">
        <tr>
        <th>name</th>
        <th>phone</th>
        <th>other phone</th>
        <th>address</th>
        <th>dist</th>
        <th>state</th>
        <th>Country</th>
        <th>pin</th>
        <th>email</th>
        <th>pwd</th>
        <th>Action</th>
        </tr>
        {getView.map((item, index)=>(
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
                <Link className="btn btn-primary btn-block" to="/registerupdate" state={{id:item._id}}>Edit</Link>
                <button className="btn btn-primary btn-block" onClick={() => handleDelete(item._id)}>Delete</button>
                {/* <button onClick={() => handleUpdate(item._id)}>Update</button> */}
            </td>
        </tr>
        ))}
    </table>
</div>
</div>
        </>
    )
}


export default RegisterView