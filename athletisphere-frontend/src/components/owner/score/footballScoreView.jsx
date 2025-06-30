import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FootballScoreView(){

const { matchId } = useParams();
const navigate = useNavigate();



// const [getView, setView] = useState({});
const [getFirstName, setFirstName] = useState("");
const [getFirstLogo, setFirstLogo] = useState("");
const [getFirstScore, setFirstScore] = useState("");
const [getSecondName, setSecondName] = useState("");
const [getSecondLogo, setSecondLogo] = useState("");
const [getSecondScore, setSecondScore] = useState("");
const [getLink, setLink] = useState("");
// const [getSportId, setSportId] = useState("");
// const [getOwner, setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")));


useEffect(() => {
  fetch(`http://localhost:8000/sports/footballview/${matchId}`)
    .then((res) => res.json())
    .then((result) => {
      console.log("Fetched turf:", result);
    //   setView(result);
      setFirstName(result.first_team_name);
      setSecondName(result.second_team_name);
      setFirstScore(result.first_team_score);
      setSecondScore(result.second_team_score);
      setFirstLogo(result.first_team_logo);
      setSecondLogo(result.second_team_logo);
      setLink(result.video);
    });
}, [matchId]);


// if (!getView) {
//     return <div className="text-center mt-5">Loading match data...</div>;
//   }


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
    formData.append("first_team_score",getFirstScore)
    formData.append("second_team_name",getSecondName)
    formData.append("second_team_score",getSecondScore)

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

    fetch("http://localhost:8000/sports/footballupdate",{
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
                <div className="row footballscore">
                    <div class="col-sm-2">
                    <input className="form-control form-control-sm" type="file" id="" onChange={(e)=>setFirstLogo(e.target.files[0])}/>
                    </div>
                    <div className="col-sm-1">
                        <img src={typeof getFirstLogo === "string"
                    ? `http://localhost:8000/img/${getFirstLogo}`
                    : URL.createObjectURL(getFirstLogo)
                   } style={{width: "50px", height: "40px", borderRadius: "3px"}} alt="" className="img-fluid"/>
                        {/* <img src={typeof getFirstLogo === "string" ? `http://localhost:8000/img/${getFirstLogo}` : URL.createObjectURL(getFirstLogo) } width={100} height={100} alt="" /> */}
                        {/* <img src={`http://localhost:8000/img/${getFirstLogo}`} width={100} height={100} style={{width: "50px", height: "40px", borderRadius: "3px"}} className="img-fluid"/> */}
                        {/* <img src="football.jpg" alt="logo" style={{width: "50px", height: "40px", borderRadius: "3px"}} className="img-fluid"/> */}
                    </div>
                    <div className="col-sm-1">
                        <input type="text" name="" id="" placeholder="Goal" style={{width: "75px"}} className="form-control form-control-sm" value={getFirstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className="col-sm-1">
                        <input type="number" name="" id="" placeholder="Goal" style={{width: "75px"}} className="form-control form-control-sm" value={getFirstScore} onChange={(e)=>setFirstScore(e.target.value)}/>
                    </div>

                    

                    <div className="col-sm-1">
                        <input type="number" name="" id="" placeholder="Goal" style={{width: "75px"}} className="form-control form-control-sm" value={getSecondScore} onChange={(e)=>setSecondScore(e.target.value)}/>
                    </div>
                    <div className="col-sm-1">
                        <input type="text" name="" id="" placeholder="Goal" style={{width: "75px"}} className="form-control form-control-sm" value={getSecondName} onChange={(e)=>setSecondName(e.target.value)}/>
                    </div>
                    <div className="col-sm-1">
                        <img src={typeof getSecondLogo === "string"
                    ? `http://localhost:8000/img/${getSecondLogo}`
                    : URL.createObjectURL(getSecondLogo)
                   } style={{width: "50px", height: "40px", borderRadius: "3px"}} alt="" className="img-fluid"/>
                        {/* <img src={`http://localhost:8000/img/${getSecondLogo}`} width={100} height={100} alt="" style={{width: "50px", height: "40px", borderRadius: "3px"}} className="img-fluid"/> */}
                    </div>
                   <div class="col-sm-2">
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


export default FootballScoreView