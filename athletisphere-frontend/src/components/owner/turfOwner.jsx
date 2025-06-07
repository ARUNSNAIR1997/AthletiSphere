import React from "react";


function TurfOwner(){
    return(
        <>
        <div className="body-cont contanier">
        <div className="turf">
        <div>
            <h2>Create Turf Details</h2>
        </div>
        <div>
            <select className="form-control"  required>
                    <option selected="">Select Turf</option>
                    <option>Designer</option>
                    <option>Manager</option>
                    <option>Accaunting</option>
            </select>
        </div>
        <div>
            <select className="form-control"  required>
                    <option selected="">Select sports</option>
                    <option>Designer</option>
                    <option>Manager</option>
                    <option>Accaunting</option>
            </select>
        </div>
        </div>
        </div>
        </>
    )
}



export default TurfOwner