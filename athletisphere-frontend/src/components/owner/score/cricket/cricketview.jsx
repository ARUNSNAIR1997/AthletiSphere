import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function CricketView(){

const { matchId } = useParams()
const navigate = useNavigate()

const [getLink, setLink] = useState("")
const [getFirstName, setFirstName] = useState("")
const [getFirstLogo, setFirstLogo] = useState("")
const [getScore, setScore] = useState("")
const [getSecondName, setSecondName] = useState("")
const [getSecondLogo, setSecondLogo] = useState("")
const [getOver, setOver] = useState("")
const [getBall, setBall] = useState("")
const [getWicket, setWicket] = useState("")


useEffect(() => {
  fetch(`http://localhost:8000/sports/cricketview/${matchId}`)
    .then((res) => res.json())
    .then((result) => {
      console.log("Fetched turf:", result);
    //   setView(result);
      setFirstName(result.first_team_name);
      setSecondName(result.second_team_name);
      setScore(result.score);
      setFirstLogo(result.first_team_logo);
      setSecondLogo(result.second_team_logo);
      setLink(result.video);
      setOver(result.over);
      setBall(result.ball);
      setWicket(result.wicket);
    });
}, [matchId]);


// youtube link
const getEmbedLink = (link) => {
  if (!link) return "";
  if (link.includes("youtube.com/watch?v=")) {
    return link.replace("watch?v=", "embed/");
  }
  if (link.includes("youtu.be/")) {
    return link.replace("youtu.be/", "www.youtube.com/embed/");
  }
  return link; // fallback
};




//update
const handleUpdate = ()=>{
    let formData = new FormData();
    formData.append("id",matchId)
    formData.append("video", getLink);
    formData.append("first_team_name",getFirstName)
    formData.append("score",getScore)
    formData.append("second_team_name",getSecondName)
    formData.append("wicket",getWicket)
    formData.append("over",getOver);
    formData.append("ball",getBall)

     if(typeof getFirstLogo === "object"){
    formData.append("first_team_logo",getFirstLogo)
    }else{
    formData.append("existingFirst_team_logo",getFirstLogo)
    }

     if(typeof getSecondLogo === "object"){
    formData.append("second_team_logo",getSecondLogo)
    }else{
    formData.append("existingSecond_team_logo",getSecondLogo)
    }

    fetch("http://localhost:8000/sports/cricketupdate",{
        method: "post",
        body: formData
    }).then((res)=>res.json()).then((result)=>{
        console.log(result);
    })
}


    return(
        <>
        <div className="container">
                

                <div class="video-container text-center">
                    <iframe 
                    width="750" height="500"
                    src={getEmbedLink(getLink)}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
                </div>
                <div className=" footballscore">
                    <div class="">
                    <input className="form-control form-control-sm" type="file" id="" onChange={(e)=>setFirstLogo(e.target.files[0])}/>
                    </div>
                    <div className="">
                        <img src={typeof getFirstLogo === "string"
                    ? `http://localhost:8000/img/${getFirstLogo}`
                    : URL.createObjectURL(getFirstLogo)
                   } style={{width: "50px", height: "40px", borderRadius: "3px"}} alt="" className="img-fluid"/>
                        
                    </div>
                    <div className="">
                        <input type="text" name="" id="" style={{width: "75px"}} className="form-control form-control-sm" value={getFirstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className="">
                        <input type="number" name="" id="" style={{width: "75px"}} className="form-control form-control-sm" value={getScore} onChange={(e)=>setScore(e.target.value)}/>
                        <div className="text-center">Run</div>
                    </div>
                    <div className="">
                        <input type="number" name="" id="" style={{width: "75px"}} className="form-control form-control-sm" value={getWicket} onChange={(e)=>setWicket(e.target.value)}/>
                        <div className="text-center">Wicket</div>
                    </div>

                    

                    <div className="">
                        <input type="number" name="" id="" style={{width: "75px"}} className="form-control form-control-sm" value={getOver} onChange={(e)=>setOver(e.target.value)}/>
                        <div className="text-center">Over</div>
                    </div>
                    <div className="">
                        <input type="number" name="" id="" style={{width: "75px"}} className="form-control form-control-sm" value={getBall} onChange={(e)=>setBall(e.target.value)}/>
                        <div className="text-center">Ball</div>
                    </div>
                    <div className="">
                        <input type="text" name="" id="" placeholder="Goal" style={{width: "75px"}} className="form-control form-control-sm" value={getSecondName} onChange={(e)=>setSecondName(e.target.value)}/>
                    </div>
                    <div className="">
                        <img src={typeof getSecondLogo === "string"
                    ? `http://localhost:8000/img/${getSecondLogo}`
                    : URL.createObjectURL(getSecondLogo)
                   } style={{width: "50px", height: "40px", borderRadius: "3px"}} alt="" className="img-fluid"/>
                    
                    </div>
                   <div class="">
                    <input class="form-control form-control-sm" type="file" onChange={(e)=>setSecondLogo(e.target.files[0])}/>
                    </div>
                </div>
        
                <div className="video-btn">
                    <button className="form-control" style={{width: "100px"}} onClick={handleUpdate}>Update</button>
                    <button className="form-control" style={{width: "100px"}} onClick={() => navigate(`/`)}>Finish</button>
                </div>
        </div>
        </>
    )
}


export default CricketView