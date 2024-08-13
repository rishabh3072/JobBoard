import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main";
import "../App.css"

const JobSeekerProfile = () => {
  const { user, setUser } = useContext(Context); // Get user data from Context
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone, email: user.email });
    }
  }, [user]);



  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      <h2 style={{textAlign:"center" ,color:"slateblue"}}>Job Seeker Profile</h2>
      
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
    </div>
  );
};

export default JobSeekerProfile;
