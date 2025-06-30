import React from "react";

function Footer() {
  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div className="mt-5">
        <footer
          className="text-center text-lg-start"
          style={{ backgroundColor: "#0D9276" }}
        >
          <div className="container d-flex justify-content-center py-5">
            <button
              type="button"
              className="btn btn-dark btn-lg btn-floating mx-2"
              style={{ backgroundColor: "orange" }}
            >
              <i className="fab fa-facebook-f"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-lg btn-floating mx-2"
              style={{ backgroundColor: "orange" }}
            >
              <i className="fab fa-youtube"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-lg btn-floating mx-2"
              style={{ backgroundColor: "orange" }}
            >
              <i className="fab fa-instagram"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-lg btn-floating mx-2"
              style={{ backgroundColor: "orange" }}
            >
              <i className="fab fa-twitter"></i>
            </button>
          </div>

          {/* Copyright */}
          <div
            className="text-center text-white p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2025 Copyright:{" "}
            <a className="text-white" href="https://mdbootstrap.com/">
              Athletisphere
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
