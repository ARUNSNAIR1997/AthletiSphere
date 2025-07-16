import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegister(){

const navigate = useNavigate()

const [getProfile, setProfile] = useState("")
const [getFirst, setFirst] = useState("")
const [getLast, setLast] = useState("")
const [getPhone1, setPhone1] = useState("")
const [getPhone2, setPhone2] = useState("")
const [getAddress, setAddress] = useState("")
const [getGender, setGender] = useState("")
// const [getState, setState] = useState("")
// const [getDistrict, setDistrict] = useState("")
// const [getCountry, setCountry] = useState("")
// const [getPin, setPin] = useState("")
const [getDob, setDob] = useState("")
const [getEmail, setEmail] = useState("")
const [getPassword, setPassword] = useState("")





const handleForm = ()=>{
  let fromData = new FormData()
  fromData.append("profile",getProfile)
  fromData.append("firstname",getFirst)
  fromData.append("lastname",getLast)
  fromData.append("firstnumber",getPhone1)
  fromData.append("secondnumber",getPhone2)
  fromData.append("address",getAddress)
  fromData.append("gender",getGender)
  // fromData.append("state",getState)
  // fromData.append("district",getDistrict)
  // fromData.append("country",getCountry)
  // fromData.append("pincode",getPin)
  fromData.append("location",endlocation)
  fromData.append("dob",getDob)
  fromData.append("email",getEmail)
  fromData.append("password",getPassword)
  fromData.append("role","user")
  
    fetch("http://localhost:8000/sports/userregister",{
        method:"post",
        body: fromData
    }).then((res)=>res.json()).then((result)=>{
        console.log("user inserted",result);
        navigate("/userlogin")
    })
}



// location

  // const [startlocation, setStartlocation] = useState("");
  const [endlocation, setEndlocation] = useState("");
  // const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  // const [startLatLng, setStartLatLng] = useState({ lat: null, lng: null });
  const [endLatLng, setEndLatLng] = useState({ lat: null, lng: null });

  const API_KEY = "n4Yzg7yiZdGPqjicI88XfHyRY7SBuMsaProAtSD0";

const fetchSuggestions = async (input, setSuggestions) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log("Autocomplete data:", JSON.stringify(data));

      if (data?.predictions) {
        setSuggestions(
          data.predictions.map((item) => ({
            description: item.description,
            id: item.place_id, // Correctly mapped
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };


    return(
        <>
<section class="userregister h-100 bg-dark">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">
            <div class="col-xl-6 d-none d-xl-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo" class="img-fluid"
                 />
            </div>
            <div class="col-xl-6">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">User registration form</h3>

                <div data-mdb-input-init class="mb-4">
                  <input type="file" class="form-control form-control-lg" id="getProfile" onChange={(e)=>setProfile(e.target.files[0])}/>
                  <label class="form-label" for="form3Example8">Profile Picture</label>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getFirst} onChange={(e)=>setFirst(e.target.value)}/>
                      <label class="form-label" for="form3Example1m">First name</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getLast} onChange={(e)=>setLast(e.target.value)}/>
                      <label class="form-label" for="form3Example1n">Last name</label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getPhone1} onChange={(e)=>setPhone1(e.target.value)}/>
                      <label class="form-label" for="form3Example1m1">Phone number1</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getPhone2} onChange={(e)=>setPhone2(e.target.value)}/>
                      <label class="form-label" for="form3Example1n1">Phone number2</label>
                    </div>
                  </div>
                </div>

                <div data-mdb-input-init class="mb-4">
                  <input type="text" class="form-control form-control-lg" value={getAddress} onChange={(e)=>setAddress(e.target.value)}/>
                  <label class="form-label" for="form3Example8">Address</label>
                </div>

                <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">

                  <h6 class="mb-0 me-4">Gender: </h6>

                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                       value="Female" checked={getGender === "Female"} onChange={(e)=>setGender(e.target.value)}/>
                    <label class="form-check-label" for="femaleGender">Female</label>
                  </div>

                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                      value="Male" checked={getGender === "Male"} onChange={(e)=>setGender(e.target.value)} />
                    <label class="form-check-label" for="maleGender">Male</label>
                  </div>

                  <div class="form-check form-check-inline mb-0">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                      value="Other" checked={getGender === "Other"} onChange={(e)=>setGender(e.target.value)} />
                    <label class="form-check-label" for="otherGender">Other</label>
                  </div>

                </div>

                {/* <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getState} onChange={(e)=>setState(e.target.value)}/>
                      <label class="form-label" for="form3Example1m">State</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getDistrict} onChange={(e)=>setDistrict(e.target.value)}/>
                      <label class="form-label" for="form3Example1n">District</label>
                    </div>
                  </div>
                </div> */}

                <div class="row">
                  {/* <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="">
                      <input type="text" class="form-control form-control-lg" value={getCountry} onChange={(e)=>setCountry(e.target.value)}/>
                      <label class="form-label" for="form3Example1m">Country</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="mb-4">
                    <input type="text" class="form-control form-control-lg" value={getPin} onChange={(e)=>setPin(e.target.value)}/>
                    <label class="form-label" for="form3Example90">Pincode</label>
                    </div>
                  </div> */}
                  {/* Destination Input */}
                  <div className="mb-3">
                    <label className="form-label">Destination</label>
                    <input
                      type="text"
                      className="form-control"
                      value={endlocation}
                      onChange={(e) => {
                        setEndlocation(e.target.value);
                        fetchSuggestions(e.target.value, setDestinationSuggestions);
                      }}
                    />
                    <ul className="list-group">
                      {destinationSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            setEndlocation(suggestion.description);
                            setDestinationSuggestions([]);
                            fetchPlaceDetails(suggestion.id, setEndLatLng);
                          }}
                        >
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div data-mdb-input-init class="mb-4">
                  <input type="date" class="form-control form-control-lg" value={getDob} onChange={(e)=>setDob(e.target.value)}/>
                  <label class="form-label" for="form3Example9">DOB</label>
                </div>

                <div data-mdb-input-init class="mb-4">
                  <input type="email" class="form-control form-control-lg" value={getEmail} onChange={(e)=>setEmail(e.target.value)}/>
                  <label class="form-label" for="form3Example97">Email ID</label>
                </div>

                <div data-mdb-input-init class="mb-4">
                  <input type="password" class="form-control form-control-lg" value={getPassword} onChange={(e)=>setPassword(e.target.value)}/>
                  <label class="form-label" for="form3Example99">Password</label>
                </div>

                <div class="d-flex justify-content-end pt-3">
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-warning btn-lg ms-2" onClick={handleForm}>Submit form</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}


export default UserRegister