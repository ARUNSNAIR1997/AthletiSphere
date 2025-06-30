import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Order() {
  const [authenticated] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [startlocation, setStartlocation] = useState("");
  const [endlocation, setEndlocation] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [startLatLng, setStartLatLng] = useState({ lat: null, lng: null });
  const [endLatLng, setEndLatLng] = useState({ lat: null, lng: null });

  const API_KEY = "n4Yzg7yiZdGPqjicI88XfHyRY7SBuMsaProAtSD0";
  const navigate = useNavigate();


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

  const save = async () => {
    if (!startLatLng.lat || !startLatLng.lng || !endLatLng.lat || !endLatLng.lng) {
      alert("Please select source and destination from the suggestions.");
      return;
    }

    const params = {
      load,
      startlocation,
      goddownid: authenticated._id,
      endlocation,
      startLat: startLatLng.lat,
      startLng: startLatLng.lng,
      endLat: endLatLng.lat,
      endLng: endLatLng.lng,
    };

    try {
      const response = await fetch("http://localhost:8000/sports/test", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const result = await response.json();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <>
    
      <div className="content">

        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-10">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Add Order Details</h6>
             
                <form>
                  <div className="mb-3">
                    <label className="form-label">Load</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setLoad(e.target.value)}
                    />
                  </div>

                  {/* Source Input */}
                  <div className="mb-3">
                    <label className="form-label">Source</label>
                    <input
                      type="text"
                      className="form-control"
                      value={startlocation}
                      onChange={(e) => {
                        setStartlocation(e.target.value);
                        fetchSuggestions(e.target.value, setSourceSuggestions);
                      }}
                    />
                    <ul className="list-group">
                      {sourceSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            setStartlocation(suggestion.description);
                            setSourceSuggestions([]);
                            fetchPlaceDetails(suggestion.id, setStartLatLng);
                          }}
                        >
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  </div>

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

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={save}
                    // disabled={!startLatLng.lat || !endLatLng.lat}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
