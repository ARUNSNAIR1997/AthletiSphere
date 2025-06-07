import React from "react";
import AdminNav from "../partials/adminNav";


function SportsDetails(){
    return(
        <>
{/* nav */}
<AdminNav/>


        <div className="container py-5">
      <div className="row justify-content-center body-cont">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm sports-cont">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sports Details</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="sportsName" className="form-label">Sports Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sportsName"
                    placeholder="Enter the sports name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sportsIcon" className="form-label">Upload Sports Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    id="sportsIcon"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sportsDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="sportsDescription"
                    rows="4"
                    placeholder="Enter the sports description"
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


export default SportsDetails