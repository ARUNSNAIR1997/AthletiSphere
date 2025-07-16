import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../partials/usernav";
import Footer from "../../partials/footer";


function AllTurf(){

const { sportsId } = useParams()
const [getView, setView] = useState([])
const navigate = useNavigate()
const [searchTerm, setSearchTerm] = useState("");

useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/sports/turfuserview?sports=${sportsId}&location=${searchTerm}`).then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[sportsId])


const filteredTurfs = getView.filter((item) =>
  item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  // item.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  // item.state?.toLowerCase().includes(searchTerm.toLowerCase())
);


    return(
        <>

<UserNav/>

        <div className="container body-cont">
          <div className="pb-4">
            <input
  type="search"
  placeholder="Enter your location"
  className="form-control"
  style={{ width: "500px" }}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
            {/* <input type="search" name="" id="" placeholder="enter your location" className="form-control" style={{width: "500px"}}/> */}
          </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            {filteredTurfs.map((item)=>(
  <div className="allturf col" key={item._id}>
    <div class="card">
        {/* {item.images.map((m, n)=>(
        <div> */}
            <img src={`http://localhost:8000/img/${item.images[0]}`} width={100} height={300} class="card-img-top" alt="..." style={{objectFit: "cover"}} onClick={() => navigate(`/singleturf/${item._id}`)}/>
        {/* </div>
      ))} */}
      <div class="card-body">
        <h5 class="card-title">{item.turf_name}</h5>
        <p class="card-text"><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp;{item.price}&nbsp;/&nbsp;<i class="fa-regular fa-user"></i></p>
      </div>
    </div>
  </div>
  ))}

</div>
</div>


<Footer/>
        </>
    )
}



export default AllTurf
