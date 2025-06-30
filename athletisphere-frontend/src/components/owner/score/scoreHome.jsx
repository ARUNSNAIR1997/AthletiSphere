import React, { useEffect, useState } from "react";
import FootballScore from "./footballScore";
import { useLocation } from "react-router-dom";
import CricketScore from "./cricket/cricket";
import { useParams } from "react-router-dom";

function ScoreHome(){

    const { sportsId } = useParams()
// const location = useLocation()
// const sportsId = location.state?.id;
// console.log("location",location);
const [getView, setView] = useState([])
const [selectedSport, setSelectedSport] = useState(null)
    
    useEffect(()=>{
        fetch("http://localhost:8000/sports/sportsview").then((res)=>res.json()).then((result)=>{
            console.log("viewed",result);
            setView(result) 

            // find the sport matching the ID
        const match = result.find((sport) => sport._id === sportsId);
        console.log("match",match);
        
        setSelectedSport(match);
        })
    },[sportsId])


  if (!selectedSport) {
    return <p className="text-center mt-5">Loading or invalid sport...</p>;
  }



// Conditional rendering based on sport name/type
  if (selectedSport.sports_name === "Football") {
    return <FootballScore />;
  } else if (selectedSport.sports_name === "Cricket") {
    return <CricketScore />;
  } else {
    return <p>Invalid sport type</p>;
  }



}


export default ScoreHome