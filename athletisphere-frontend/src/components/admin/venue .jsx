import React from "react";
import AdminNav from "../partials/adminNav";


function Venue(){
    return(
        <>

{/* nav */}
<AdminNav/>

        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body venue-cont">
              <h2 className="card-title text-center mb-4">Venue</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="amenityName" className="form-label">Venue Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="amenityName"
                    placeholder="Enter the amenity name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amenityIcon" className="form-label">Upload Venue Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    id="amenityIcon"
                  />
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


export default Venue