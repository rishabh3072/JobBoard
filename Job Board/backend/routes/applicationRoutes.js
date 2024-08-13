import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  hireJobSeeker,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

import {
  getEmployerProfile,
  updateEmployerProfile,
  deleteEmployerProfile,
  getJobSeekerProfile,
  updateJobSeekerProfile,
  deleteJobSeekerProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
router.post("/hire/:id", isAuthenticated, hireJobSeeker);

// Employer profile routes
router.get("/employer/profile", isAuthenticated, getEmployerProfile);
router.put("/employer/profile", isAuthenticated, updateEmployerProfile);
router.delete("/employer/profile", isAuthenticated, deleteEmployerProfile);

// Job seeker profile routes
router.get("/jobseeker/profile", isAuthenticated, getJobSeekerProfile);
router.put("/jobseeker/profile", isAuthenticated, updateJobSeekerProfile);
router.delete("/jobseeker/profile", isAuthenticated, deleteJobSeekerProfile);

export default router;
