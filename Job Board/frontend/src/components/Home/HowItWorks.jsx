import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "../../main";
import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const HowItWorks = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/register");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Quick Job Works</h3>
          <div className="banner">
            <div className="card" onClick={handleLogout}>
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Lets you create account whether you are a job seeker or a employer.
              </p>
            </div>
            
            <Link className="card" to={"/job/getall"} onClick={() => setShow(false)}
            style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
              <MdFindInPage />
              
              <p>Find a Job<br></br>
                Lets you find your dream jobs!
              </p>
              </div>
              </Link>
            
              {user?.role === "Employer" ? (
            <Link
              to={"/applications/me"}
              onClick={() => setShow(false)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <IoMdSend />
                <p>Recruit Suitable Candidates</p>
                <p>Hire deserving candidates!</p>
              </div>
            </Link>
          ) : (
            <div className=" card">
              <IoMdSend />
              <p>Recruit Suitable Candidates</p>
              <p>Hire deserving candidates!</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
