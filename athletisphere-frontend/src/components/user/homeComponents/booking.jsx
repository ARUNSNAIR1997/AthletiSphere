import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Booking(){

const { turfId } = useParams()
const navigate = useNavigate()

const [turf, setTurf] = useState(null)
const [getName, setName] = useState("")
const [getDate, setDate] = useState("")
const [getTime, setTime] = useState("")
const [getDuration, setDuration] = useState("")
const [getEmail, setEmail] = useState("")
const [getPhone, setPhone] = useState("")
const [getPerson, setPerson] = useState("")
const [successMsg, setSuccessMsg] = useState("");
const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))

useEffect(()=>{
    fetch(`http://localhost:8000/sports/turfedit/${turfId}`).then((res)=>res.json()).then((result)=>{
        console.log("Fetched turf:",result);
        setTurf(result)
    })
},[turfId])

if (!turf || !turf.images || turf.images.length === 0) {
    return <div>Loading...</div>;
}

const handleForm = (e)=>{
    e.preventDefault()
    let params = {
        turf:turf.turf_name,
        name:getName,
        date:getDate,
        time:getTime,
        duration:getDuration,
        email:getEmail,
        phone:getPhone,
        persons:getPerson,
        total_amount:totalAmount,
        user:getUser._id
    }
    fetch("http://localhost:8000/sports/booking",{
        method:"post",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },body:JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
        console.log("inserted",result);
        alert("✅ Payment submitted successfully!");
        // Optional: Reset form
        setName(""); setDate(""); setTime(""); setDuration("");
        setEmail(""); setPhone(""); setPerson("");


        navigate(`/bookingstatus`);

    })
}


const pricePerPerson = Number(turf.price || 0)
const numberOfPersons = Number(getPerson || 0)
const totalAmount = pricePerPerson * numberOfPersons



    return(
        <>
        {/* <!-- Credit card form --> */}
<div className="container body-cont">

<section>
  <div class="row">
    <div class="col-md-8 mb-4">
      <div class="card mb-4">
        <div class="card-header py-3">
          <h5 class="mb-0">Biling details</h5>
        </div>
        <div class="card-body">
          <form onSubmit={handleForm}>

            {/* <!-- Text input --> */}
            <div data-mdb-input-init class="mb-4">
              {/* <input type="text" id="form6Example3" class="form-control" /> */}
              <label class="form-label" for="form6Example3">Turf name : {turf.turf_name}</label>
            </div>

            {/* <!-- Text input --> */}
            <div data-mdb-input-init class="mb-4">
              <input type="text" id="form6Example3" class="form-control" value={getName} onChange={(e)=>setName(e.target.value)} />
              <label class="form-label" for="form6Example3">Full name</label>
            </div>

            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
            <div class="row mb-4">
              <div class="col">
                <div data-mdb-input-init class="">
                  <input type="date" id="form6Example1" class="form-control" value={getDate} onChange={(e)=>setDate(e.target.value)}/>
                  <label class="form-label" for="form6Example1">Date</label>
                </div>
              </div>
              <div class="col">
                <div data-mdb-input-init class="">
                  <input type="time" id="form6Example2" class="form-control" value={getTime} onChange={(e)=>setTime(e.target.value)}/>
                  <label class="form-label" for="form6Example2">Start time</label>
                </div>
              </div>
              <div class="col">
                <div data-mdb-input-init class="">
                  <input type="number" id="form6Example2" class="form-control" value={getDuration} onChange={(e)=>setDuration(e.target.value)}/>
                  <label class="form-label" for="form6Example2">Duration (hr)</label>
                </div>
              </div>
            </div>


            {/* <!-- Text input --> */}
            {/* <div data-mdb-input-init class="form-outline mb-4">
              <input type="text" id="form6Example4" class="form-control" />
              <label class="form-label" for="form6Example4">Address</label>
            </div> */}

            {/* <!-- Email input --> */}
            <div data-mdb-input-init class="mb-4">
              <input type="email" id="form6Example5" class="form-control" value={getEmail} onChange={(e)=>setEmail(e.target.value)}/>
              <label class="form-label" for="form6Example5">Email</label>
            </div>

            {/* <!-- Number input --> */}
            <div data-mdb-input-init class="mb-4">
              <input type="number" id="form6Example6" class="form-control" value={getPhone} onChange={(e)=>setPhone(e.target.value)}/>
              <label class="form-label" for="form6Example6">Phone</label>
            </div>

            {/* <hr class="my-4" /> */}

            {/* <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="checkoutForm1" />
              <label class="form-check-label" for="checkoutForm1">
                Shipping address is the same as my billing address
              </label>
            </div>

            <div class="form-check mb-4">
              <input class="form-check-input" type="checkbox" value="" id="checkoutForm2" checked />
              <label class="form-check-label" for="checkoutForm2">
                Save this information for next time
              </label>
            </div>

            <hr class="my-4" />

            <h5 class="mb-4">Payment</h5>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="checkoutForm3"
                checked />
              <label class="form-check-label" for="checkoutForm3">
                Credit card
              </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="checkoutForm4" />
              <label class="form-check-label" for="checkoutForm4">
                Debit card
              </label>
            </div>

            <div class="form-check mb-4">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="checkoutForm5" />
              <label class="form-check-label" for="checkoutForm5">
                Paypal
              </label>
            </div>

            <div class="row mb-4">
              <div class="col">
                <div data-mdb-input-init class="form-outline">
                  <input type="text" id="formNameOnCard" class="form-control" />
                  <label class="form-label" for="formNameOnCard">Name on card</label>
                </div>
              </div>
              <div class="col">
                <div data-mdb-input-init class="form-outline">
                  <input type="text" id="formCardNumber" class="form-control" />
                  <label class="form-label" for="formCardNumber">Credit card number</label>
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-3">
                <div data-mdb-input-init class="form-outline">
                  <input type="text" id="formExpiration" class="form-control" />
                  <label class="form-label" for="formExpiration">Expiration</label>
                </div>
              </div>
              <div class="col-3">
                <div data-mdb-input-init class="form-outline">
                  <input type="text" id="formCVV" class="form-control" />
                  <label class="form-label" for="formCVV">CVV</label>
                </div>
              </div>
            </div> */}

            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" type="submit">
              Continue to checkout
            </button>
            
{successMsg && (
  <div className="alert alert-success" role="alert">
    {successMsg}
  </div>
)}
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-4">
      <div class="card mb-4">
        <div class="card-header py-3">
          <h5 class="mb-0">Summary</h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              <span><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp;{turf.price}&nbsp;/&nbsp;<i class="fa-regular fa-user"></i></span>
              <span><input type="number" id="form6Example6" class="form-control" value={getPerson} onChange={(e)=>setPerson(e.target.value)}/></span>
            </li>
            {/* <li class="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>Gratis</span>
            </li> */}
            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
                <strong>
                  <p class="mb-0">(including VAT)</p>
                </strong>
              </div>
              {/* <span><strong><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp;{turf.price}</strong></span> */}
              <span><strong><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{totalAmount}</strong></span>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
        </>
    )
}


export default Booking