import React from "react";
import AdminNav from "../partials/adminNav";
import { Link, useNavigate } from "react-router-dom";


function AdminHome(){

const navigate = useNavigate()

const handleOwner = ()=>{
    navigate("/registerview")
}

const handleAmenitie = ()=>{
    navigate("/amenitiesview")
}

const handleVenue = ()=>{
    navigate("/venueview")
}

const handleSports = ()=>{
    navigate("/sportsview")
}

    return(
        <>

<AdminNav/>

        <div className="container home">
        <div className="row body-cont">
            <div className="col gy-4">
                <div className="card" style={{backgroundColor: "#FFAAAA"}} onClick={handleOwner}>
                <div className="card-img-overlay">
                <h4 className="card-title">Owner Registration</h4>
                </div>
                </div>
            </div>
            <div className="col gy-4">
                <div className="card" style={{backgroundColor: "#99BC85"}} onClick={handleAmenitie}>
                <div className="card-img-overlay">
                <h4 className="card-title">Amenities</h4>
                </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col gy-4">
                <div className="card" style={{backgroundColor: "#FFB433"}} onClick={handleVenue}>
                <div className="card-img-overlay">
                <h4 className="card-title">Venue</h4>
                </div>
                </div>
            </div>
            <div className="col gy-4">
                <div className="card" style={{backgroundColor: "#80C4E9"}} onClick={handleSports}>
                <div className="card-img-overlay">
                <h4 className="card-title">Sports</h4>
                </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}


export default AdminHome