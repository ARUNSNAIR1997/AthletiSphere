import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../partials/usernav";


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
const [existingBookings, setExistingBookings] = useState([]);
// const [getOwner, setOwner] = useState(JSON.parse(localStorage.getItem("ownerdata")))

//razorpay
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);


const handleRazorpayPayment = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/sports/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalAmount }),
  });

  const orderData = await res.json();

  const options = {
    key: "rzp_test_i1ObE9ri0Ub6OK", // from Razorpay dashboard
    amount: orderData.amount,
    currency: orderData.currency,
    name: "Turf Booking",
    description: `Booking for ${turf.turf_name}`,
    order_id: orderData.id,
    handler: function (response) {
      // Success handler
      console.log("Payment success:", response);
      submitBooking(); // Call form submit logic here
    },
    prefill: {
      name: getUser.firstname,
      email: getEmail,
      contact: getPhone,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};





useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/sports/turfedit/${turfId}`).then((res)=>res.json()).then((result)=>{
        console.log("Fetched turf:",result);
        setTurf(result)
    })

// Fetch bookings for this turf
  fetch(`${process.env.REACT_APP_API_URL}/sports/bookingview?user=${getUser._id}`)
    .then((res) => res.json())
    .then((bookings) => {
      setExistingBookings(bookings);
    });
}, [turfId]);



if (!turf || !turf.images || turf.images.length === 0) {
    return <div>Loading...</div>;
}


// Convert "HH:MM" → decimal hours
const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours + minutes / 60;
};

// Convert decimal hours → "HH:MM"
const formatTime = (decimal) => {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};


const handleForm = (e)=>{
    e.preventDefault()


  const selectedStart = parseTime(getTime);
  const selectedEnd = selectedStart + parseFloat(getDuration);
  

   // Conflict check
  const isConflict = existingBookings.some((booking) => {
    if (booking.date !== getDate) return false;

    const bookingStart = parseTime(booking.time);
    const bookingEnd = bookingStart + parseFloat(booking.duration);
    

    return (
      (selectedStart >= bookingStart && selectedStart < bookingEnd) || // new start inside existing
      (selectedEnd > bookingStart && selectedEnd <= bookingEnd) || // new end inside existing
      (selectedStart <= bookingStart && selectedEnd >= bookingEnd) // overlaps entire booking
    );
  });

  if (isConflict) {
    alert("❌ Time slot overlaps with an existing booking. Please choose a different time.");
    return;
  }

  // ✅ Call Razorpay only after no conflict
  handleRazorpayPayment();

    // let params = {
    //     turf:turf.turf_name,
    //     name:getUser.firstname,
    //     sports:turf.sports?.sports_name,
    //     date:getDate,
    //     time:getTime,
    //     duration:getDuration,
    //     email:getEmail,
    //     phone:getPhone,
    //     persons:getPerson,
    //     total_amount:totalAmount,
    //     user:getUser._id
    //     // owner:getOwner._id
    // }
    // fetch("http://localhost:8000/sports/booking",{
    //     method:"post",
    //     headers:{
    //         Accept:"application/json",
    //         "Content-Type":"application/json"
    //     },body:JSON.stringify(params)
    // }).then((res)=>res.json()).then((result)=>{
    //     console.log("inserted",result);
    //     alert("✅ Payment submitted successfully!");
    //     // Optional: Reset form
    //     setName(""); setDate(""); setTime(""); setDuration("");
    //     setEmail(""); setPhone(""); setPerson("");


    //     navigate(`/bookingstatus`);

    // })
}



const submitBooking = () => {
  const params = {
    turf: turf.turf_name,
    name: getUser.firstname,
    sports: turf.sports?.sports_name,
    date: getDate,
    time: getTime,
    duration: getDuration,
    email: getEmail,
    phone: getPhone,
    persons: getPerson,
    total_amount: totalAmount,
    user: getUser._id,
    // owner: getOwner._id
  };

  fetch("http://localhost:8000/sports/booking", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("inserted", result);
      alert("✅ Payment submitted successfully!");

      // Optional: Reset form
      setName("");
      setDate("");
      setTime("");
      setDuration("");
      setEmail("");
      setPhone("");
      setPerson("");

      navigate(`/bookingstatus`);
    });
};



const pricePerPerson = Number(turf.price || 0)
const numberOfPersons = Number(getPerson || 0)
const totalAmount = pricePerPerson * numberOfPersons






    return(
        <>

<UserNav/>


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

            <div className="row mb-4">
              <div className="col">
            <div data-mdb-input-init class="mb-4">
              {/* <input type="text" id="form6Example3" class="form-control" value={getName} onChange={(e)=>setName(e.target.value)} /> */}
              <label class="form-label" for="form6Example3">Name: {getUser.firstname}</label>
            </div>
              </div>
              <div className="col">
              <div data-mdb-input-init class="mb-4">
              {/* <input type="text" id="form6Example3" class="form-control" value={getName} onChange={(e)=>setName(e.target.value)} /> */}
              <label class="form-label" for="form6Example3">Sports: {turf.sports?.sports_name}</label>
            </div>
              </div>
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


            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" type="submit">
              Pay & Book
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

{/* booked slote */}
            
<div className="card mb-4">
  <div className="card-header py-3">
    <h5 className="mb-0">Booked Time Slots</h5>
  </div>
  <div className="card-body">
    {existingBookings.filter(b => b.date === getDate).length === 0 ? (
      <p>No bookings for this date.</p>
    ) : (
      <ul className="list-group">
        {existingBookings
          .filter((booking) => booking.date === getDate)
          .map((booking, index) => {
            const start = parseTime(booking.time);
            const end = start + parseFloat(booking.duration);
            return (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>
                  {booking.time} → {formatTime(end)}
                </span>
                <span>{booking.name}</span>
              </li>
            );
          })}
      </ul>
    )}
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
