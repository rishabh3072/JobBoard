import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    if (isAuthorized === false) {
      navigateTo("/");
    } else if (isAuthorized && user) {
      const fetchApplications = async () => {
        try {
          const url =
            user.role === "Employer"
              ? "http://localhost:4000/api/v1/application/employer/getall"
              : "http://localhost:4000/api/v1/application/jobseeker/getall";

          const { data } = await axios.get(url, { withCredentials: true });
          setApplications(data.applications);
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };

      fetchApplications();
    } else {
      setLoading(false); // Stop loading if authorization check is done
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const hireApplicant = async (id) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/application/hire/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "Hired" } : app
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
                hireApplicant={hireApplicant}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>CoverLetter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        {element.status === "Hired" ? (
          <button style={{ backgroundColor: "darkgreen", color: "white" }} disabled>
            Hired
          </button>
        ) : (
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        )}
      </div>
    </div>
  );
};


const EmployerCard = ({ element, openModal, hireApplicant }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>CoverLetter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button style={{ backgroundColor: "darkgreen", color: "white" }}
          onClick={() => hireApplicant(element._id)}
          disabled={element.status === "Hired"}
        >
          {element.status === "Hired" ? "Hired" : "Hire"}
        </button>
      </div>
    </div>
  );
};

export default MyApplications;
