import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
const PopularCompanies = () => {
  const [show, setShow] = useState(false);
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10, Bangalore, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 11, Hyderabad, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 12, Pune, India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
               <button className="last"><Link to={"/job/getall"} onClick={() => setShow(false)}
               style={{ textDecoration: 'none', color: 'inherit' }}>
               Available Jobs
                     </Link>
                     </button>
    </div>
  );
};

export default PopularCompanies;
