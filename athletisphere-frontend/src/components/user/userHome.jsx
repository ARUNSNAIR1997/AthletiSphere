import React, {useState, useEffect, useRef} from "react";
import UserNav from "../partials/usernav";
import { useNavigate } from "react-router-dom";
import SocialMedia from "./homeComponents/socialMedia";
import Footer from "../partials/footer";


function UserHome(){

const navigate = useNavigate()
const scrollRef = useRef(null);

const [getSports, setSports] = useState([])
const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))

//sports
useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/sports/sportsview`).then((res)=>res.json()).then((result)=>{
        console.log("viewed",result);
        setSports(result) 
    })
},[])



// Scroll handlers
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

    return(
        <>

<UserNav/>



<div className="container body-cont">

<div className="username mb-3">
  {getUser.firstname}
</div>

        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-3">All Categories</h4>
          <div>
            <button className="btn btn-outline-primary me-2" onClick={scrollLeft}>←</button>
            <button className="btn btn-outline-primary" onClick={scrollRight}>→</button>
          </div>
        </div>

        <div
          className="d-flex overflow-auto"
          ref={scrollRef}
          style={{
            gap: "10px",
            scrollBehavior: "smooth",
            paddingBottom: "10px"
          }}
        >
          {getSports.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/allturf/${item._id}`)}
              style={{
                minWidth: "200px",
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <img
                src={`http://localhost:8000/img/${item.sports_image}`}
                alt={item.sports_name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover"
                }}
              />
              <h5 className="text-center mt-2">{item.sports_name}</h5>
            </div>
          ))}
        </div>
      </div>
        

<SocialMedia/>

<Footer/>
        </>
    )
}

export default UserHome
