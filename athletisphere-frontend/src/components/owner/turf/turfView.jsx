import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import OwnerNav from "../../partials/ownernav";

function TurfView(){

const [getView, setView] = useState([])
const [getOwner, setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))

useEffect(()=>{
    fetch(`http://localhost:8000/sports/turfview?owner=${getOwner._id}`).then((res)=>res.json()).then((result)=>{
        console.log(result);
        setView(result)
    })
},[])

const handleDelete = (turfId)=>{
  if(window.confirm("Are you sure?")){
    fetch(`http://localhost:8000/sports/turfdelete/${turfId}`,{
      method:"DELETE"
    }).then((res)=>res.json()).then((result)=>{
      console.log("deleted successfully",result);
      setView((prev) => prev.filter((item) => item._id !== turfId));
    })
  }
}



    return(
        <>

<OwnerNav/>

        <div className="container body-cont">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Turf</h2>
        <Link to="/turf" className="btn btn-outline-primary">
          + Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Sports name</th>
              <th>Venue Name</th>
              <th>Amenity Name</th>
              <th>Price</th>
              <th>Photos</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getView.map((item, index) => (
              <tr key={index}>

                <td>{item.sports?.sports_name}</td>

                <td>
                {item.venues.map((v, i) => (
                <div key={i}>{v.venue_name}</div>
                ))}
                </td>

                <td>
                    {item.amenities.map((a, e)=>(
                        <div key={e}>{a.amenitie_name}</div>
                    ))}
                </td>

                <td>{item.price}</td>

                <td>
                    {item.images.map((m, n)=>(
                        <span key={n}>
                            <img src={`http://localhost:8000/img/${m}`} width={100} height={100} alt="" /><button>Delete</button>
                        </span>
                    
                    ))}
                </td>
                <td>
                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-sm btn-warning"
                      to="/turfupdate"
                      state={{ id: item._id }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </>
    )
}

export default TurfView