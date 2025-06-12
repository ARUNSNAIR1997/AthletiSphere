import React from "react";

function AdminNav(){

const handleLogout = ()=>{
    localStorage.clear()
    window.location.href="/"
}

    return(
        <>
        <header className={"display-flex"}>
            <div className="logo">Logo</div>
            <ul className="nav display-flex">
                <li><a href="/">Home</a></li>
                <li><a href="" onClick={handleLogout}>Logout</a></li>
                {/* <button onClick={handleLogout}>Logout</button> */}
            </ul>
        </header>
        </>
    )
}

export default AdminNav