import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function AllTurf(){


const [getView, setView] = useState([])
const navigate = useNavigate()

useEffect(()=>{
    fetch("http://localhost:8000/sports/turfview").then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[])

    return(
        <>
        <div className="container body-cont">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            {getView.map((item)=>(
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
        </>
    )
}



export default AllTurf