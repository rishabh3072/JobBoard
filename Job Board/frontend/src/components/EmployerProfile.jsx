import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main";
import "../App.css"

const EmployerProfile = () => {
  const { user, setUser } = useContext(Context); // Get user data from Context
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [jobs, setJobs] = useState([]);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone, email: user.email });
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/job/getmyjobs", { withCredentials: true });
      setJobs(data.myJobs);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    axios.post("http://localhost:4000/api/v1/user/uploadProfilePicture", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(response => {
      setProfilePicture(response.data.profilePictureUrl);
      toast.success("Profile picture updated successfully");
    })
    .catch(error => {
      toast.error("Failed to update profile picture");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update",
        formData,
        { withCredentials: true }
      );
      setUser(data.user);
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Handle case where user data is not available yet
  }

  return (
    <div className="Prof">
      <h2 style={{textAlign:"center" ,color:"slateblue"}}>Employer Profile</h2>
      
      {editing ? (
        <div className="editprof">
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Name:
            <input className="box" type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input className="box" type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input className="box" type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <button style={{padding:"8px", border:"none",backgroundColor:"#6285d5", cursor:"pointer",color:"white",margin:"10px"}}type="submit">Save</button>
          <button style={{padding:"8px", border:"none",backgroundColor:"#6285d5", cursor:"pointer",color:"white"}}type="button" onClick={handleEditClick}>Cancel</button>
        </form>
        </div>
      ) : (
        <div className="profile-info">
          <h3>Name: {user.name}</h3>
          <br/>
          <h3>Role: {user.role}</h3>
          <br/>
          <h3>Contact: {user.phone}</h3>
          <br/>
          <h3>Email: {user.email}</h3>
          <br/>
          <button style={{padding:"8px", border:"none",backgroundColor:"#6285d5", cursor:"pointer",color:"white"}} onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
      <div className="posted-jobs">
        <br/>
        <h3 style={{color:"SlateBlue"}}>Posted Jobs</h3>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <div className="container" style={{border:"2px solid black", padding:"20px", margin:"20px"}}>
            {jobs.map((job) => (
              <div key={job._id}>
                <br/>
                <h4>{job.title}</h4>
                <br/>
                <p>{job.description}</p>
                <br/>
                <p><strong>Location:</strong> {job.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
