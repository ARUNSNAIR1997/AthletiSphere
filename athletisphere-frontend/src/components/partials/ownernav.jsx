import React from "react";
import { useNavigate } from "react-router-dom";

function OwnerNav(){

const navigate = useNavigate()

const handleLogout = ()=>{
    localStorage.clear()
    navigate("/ownerlogin")
}


    return(
        <>
        <header className={"display-flex"}>
            <div className="logo">Logo</div>
            <ul className="nav display-flex">
                <li><a href="/">Home</a></li>
                <li><a href="" onClick={handleLogout}>Logout</a></li>
            </ul>
        </header>
        </>
    )
}

export default OwnerNav