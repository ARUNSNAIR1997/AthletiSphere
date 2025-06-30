import React from "react";
import { useNavigate } from "react-router-dom";

function UserNav(){
const navigate = useNavigate()
const handleLogout = ()=>{
    localStorage.clear()
    navigate("/userlogin")
}


    return(
        <>
        <header className={"display-flex"}>
            <div className="logo">Athletisphere</div>
            <ul className="nav display-flex">
                <li><a href="/">Home</a></li>
                <li><a href="/bookingstatus">Booking Status</a></li>
                <li><a href="/post">Post</a></li>
                <li><a href="" onClick={handleLogout}>Logout</a></li>
            </ul>
        </header>
        </>
    )
}

export default UserNav