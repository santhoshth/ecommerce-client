import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="notfound">
        <h2 className="notfound__heading">Page Not Found</h2>
        <img
          style={{ width: "100%", height: "300px", objectFit: "contain" }}
          src="https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.png"
          alt="Not-found"
        />
        <Link to="/" className="link">
          <button className="notfound__button">
            Home page
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
