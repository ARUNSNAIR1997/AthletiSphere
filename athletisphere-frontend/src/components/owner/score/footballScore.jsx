import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function FootballScore(){

// const location = useLocation()
// const turfId = location.state?.id;
// console.log("location",turfId);

const { sportsId } = useParams()

const navigate = useNavigate()
const [getLink, setLink] = useState("")
const [getFirstName, setFirstName] = useState("")
const [getFirstLogo, setFirstLogo] = useState("")
const [getFirstScore, setFirstScore] = useState("")
const [getSecondName, setSecondName] = useState("")
const [getSecondLogo, setSecondLogo] = useState("")
const [getSecondScore, setSecondScore] = useState("")
// const [getSports, setSports] = useState("")
// const [selectedSport, setSelectedSport] = useState("");
const [getView, setView] = useState([])
const [getOwner,setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))



// useEffect(()=>{
//     if(turfId){
//         fetch(`http://localhost:8000/sports/turfedit/${turfId}`).then((res)=>res.json()).then((result)=>{
//             console.log("output",result);
//             setSelectedSport(result.sports)
//         })
//     }
// },[])

useEffect(()=>{
    fetch(`http://localhost:8000/sports/turfuserview?sports=${sportsId}`).then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[sportsId])



const handleForm = ()=>{
    let formData = new FormData();
    formData.append("owner",getOwner._id)
    formData.append("sports",getView[0]?.sports?._id)
    formData.append("video",getLink)
    formData.append("first_team_name",getFirstName)
    formData.append("first_team_logo",getFirstLogo)
    formData.append("first_team_score",getFirstScore)
    formData.append("second_team_name",getSecondName)
    formData.append("second_team_logo",getSecondLogo)
    formData.append("second_team_score",getSecondScore)
    fetch("http://localhost:8000/sports/footballscore",{
        method: "post",
        body: formData
    }).then((res)=>res.json()).then((result)=>{
        console.log(result);
        if (result && result._id) {
    navigate(`/footballview/${result._id}`);
  } else {
    alert("Something went wrong, record not created properly");
  }
    })
}


    return(
        <>
  <div className="container body-cont">
    
    <div className="row">
        <div className="col-12 mb-3 d-flex justify-content-center">
            <h4>{getView[0]?.sports?.sports_name}</h4>
            {/* <h4>Football</h4> */}
        </div>
        <div className="col-12">
        <input type="text" placeholder="You can paste the video link" className="form-control" value={getLink} onChange={(e)=>setLink(e.target.value)}/>
        </div>
        <div className="col-sm-6 gy-5">
            <div className="mb-3">
                <h4>Team First</h4>
            </div>
            <div>
                <input type="text" name="" id="" placeholder="Team name" className="form-control" value={getFirstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="" className="form-label pt-3">Team logo</label>
                <input type="file" name="" id="getFirstLogo" className="form-control" onChange={(e)=>setFirstLogo(e.target.files[0])}/>
            </div>
            <div>
                <input type="number" name="" id="" placeholder="score" className="form-control mt-5" value={getFirstScore} onChange={(e)=>setFirstScore(e.target.value)}/>
            </div>
        </div>
        <div className="col-sm-6 gy-5">
            <div className="mb-3">
                <h4>Team Second</h4>
            </div>
            <div>
                <input type="text" name="" id="" placeholder="Team name" className="form-control" value={getSecondName} onChange={(e)=>setSecondName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="" className="form-label pt-3">Team logo</label>
                <input type="file" name="" className="form-control" id="getSecondLogo" onChange={(e)=>setSecondLogo(e.target.files[0])}/>
            </div>
            <div>
                <input type="number" name="" id="" placeholder="score" className="form-control mt-5" value={getSecondScore} onChange={(e)=>setSecondScore(e.target.value)}/>
            </div>
        </div>
    </div>
    <div className="col-12 mt-5 d-flex justify-content-center">
        <button className="form-control btn btn-primary w-50" onClick={handleForm}>Submit</button>
    </div>
  </div>
        
        </>
    )
}




export default FootballScore