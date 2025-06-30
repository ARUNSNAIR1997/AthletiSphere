import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function UserCricket(){
   const navigate = useNavigate()

const { turfId } = useParams()

const [turf, setTurf] = useState(null)
const [getView, setView] = useState([])

useEffect(()=>{
    fetch(`http://localhost:8000/sports/turfedit/${turfId}`).then((res)=>res.json()).then((result)=>{
        console.log("Fetched turf:",result);
        setTurf(result)
    })
},[turfId])

useEffect(()=>{
    if (turf && turf.owner) {
    fetch(`http://localhost:8000/sports/cricketuser?owner=${turf.owner}`).then((res)=>res.json()).then((result)=>{
        if (result && result.length > 0) {
                console.log("Fetched last football record:", result[result.length - 1]);
                    setView(result[result.length - 1]);
                } else {
                    console.log("No football data found");
                }
    });
}
},[turf])

    return(
        <>
        <div className="container body-cont">
        <div className="row">
        <div className="football-status col-lg-12">
        <div className="text-center">
            <div>{getView.first_team_name}</div>
            {/* <img src="football.jpg" alt="" width={100} height={100} /> */}
            <img src={`http://localhost:8000/img/${getView.first_team_logo}`} width={100} height={100} alt="" />
        </div>
        <div className="text-center">
            <div>Bating</div>
            <div>{getView.score}/{getView.wicket}</div>
        </div>
        <div className="text-center">
            <div>Balling</div>
            <div>{getView.over}/{getView.ball}</div>
        </div>
        <div className="text-center">
            <div>{getView.second_team_name}</div>
            <img src={`http://localhost:8000/img/${getView.second_team_logo}`} width={100} height={100} alt="" />
        </div>
        </div>
        </div>
        </div>
        </>
    )
}



export default UserCricket