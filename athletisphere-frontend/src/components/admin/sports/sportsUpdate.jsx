import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../../partials/adminNav";

function SportsUpdate(){

const location = useLocation()
console.log("location",location);

const navigate = useNavigate()
const sportsId = location.state?.id

const [getName, setName] = useState("")
const [getImage, setImage] = useState("")
const [getDespt, setDespt] = useState("")

useEffect(()=>{
    if(sportsId){
        fetch(`http://localhost:8000/sports/sportsedit/${sportsId}`).then((res)=>res.json()).then((result)=>{
            console.log("sports",result);
            setName(result.sports_name)
            setImage(result.sports_image)
            setDespt(result.sports_despt)
        })
    }
},[])


const handleForm = (e)=>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("id",sportsId)
    formdata.append("sports_name",getName)
    formdata.append("sports_despt",getDespt)
    if(typeof getImage === "object"){
        formdata.append("sports_image",getImage)
    }else{
        formdata.append("existingSports_image",getImage)
    }
    fetch("http://localhost:8000/sports/sportsupdate",{
        method:"post",
        body: formdata
    }).then((res)=>res.json()).then((result)=>{
        console.log("updated",result);
        navigate("/sportsview")
    })
}


    return(
        <>

<AdminNav/>

        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm sports-cont">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sports Details</h2>
              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="sportsName" className="form-label">Sports Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={getName}
                    placeholder="Enter the sports name"
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sportsIcon" className="form-label">Upload Sports Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e)=>setImage(e.target.files[0])}
                  />
                  <img src={typeof getImage === "string" ? `http://localhost:8000/img/${getImage}` : URL.createObjectURL(getImage) } width={100} height={100} alt="" />
                </div>

                <div className="mb-3">
                  <label htmlFor="sportsDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={getDespt}
                    rows="4"
                    placeholder="Enter the sports description"
                    onChange={(e)=>setDespt(e.target.value)}
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}



export default SportsUpdate