
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabContent, TabPane, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Add your custom styles here
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firestore, } from "../../../Config/ConfigFirebase.js";
import { FaHome, FaUsers, FaFileAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAutoGraph } from "react-icons/md";
import Sidebar from "./Sidebar.jsx";



function UserPage() {

  const navigate = useNavigate();
  const [userId, seId] = useState('')
  const [userdata, setUserdata] = useState('')
  const [jobs, setJobs] = useState([]);


  // to get user data and set condition for id to navigate signIn page
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('object'));

    if (adminData) {
      seId(adminData.userId)

      let id = adminData.userId

      if (!id) {
        // If the id is empty, null, or undefined, redirect to the sign-in page
        navigate('/signin');
      } else {
        // Show content

        console.log('User ID:', id);
      }
    } else {
      // If no admin data, redirect to sign-in
      navigate('/signin');
    }
  }, [navigate]);
  // to get user data and set condition for id to navigate signIn page

  //  to get user data from firebase
  useEffect(() => {
    const GetUser = async () => {
      if (userId) {
        try {
          const snap = await firestore.collection('users').doc(userId).get();
          if (snap.exists) {
            console.log('User data:', snap.data()); // Log the user data
            setUserdata(snap.data())
          } else {
            console.log('No such user found');

          }
        } catch (e) {
          console.error('Error fetching user data:', e);
        }
      }
    };

    GetUser(); // Call the function to get user data
  }, [userId]);

  //  to get user data from firebase

  // to get all jobsapplication from firebase


  const fetchJobs = async () => {
    try {
        const snapshot = await firestore.collection('jobApplications')
        .where('applicationStatus', '==', 'pending') 
        .get();
        const jobsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setJobs(jobsList);
    } catch (e) {
        console.error('Error fetching jobs:', e);
    }
};

useEffect(() => {
    fetchJobs();
}, []);

// accept reject strat

const acceptApplication = async (jobId) => {
  console.log(jobId)
    try {
        await firestore.collection('jobApplications').doc(jobId).update({
            applicationStatus: 'accepted',
        });
        alert('Application accepted!');
        // Refresh the job applications list
        fetchJobs();
    } catch (e) {
        console.error('Error accepting application:', e);
        alert('Failed to accept application.');
    }
};




const rejectApplication = async (jobId) => {
    try {
        await firestore.collection('jobApplications').doc(jobId).update({
            applicationStatus: 'rejected',
        });
        alert('Application rejected!');
        // Refresh the job applications list
        fetchJobs();
    } catch (e) {
        console.error('Error rejecting application:', e);
        alert('Failed to reject application.');
    }
};

// accept reject end
  return (
    <div>
      <div className="padding-new">
        <div className="row">
          <div className="col-3  p-0 ">
            <Sidebar />
          </div>
          <div className="col-9">
            <h1>User</h1>
            <div className="row">
              {jobs.map((job, index) => (
                <div className="col-12 col-md-4 mb-3 ml-3" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <img src={job.userImage} className="applicationImage" alt="error" />
                      <h5 className="card-title">Application For {job.jobDetails.jobCategory}</h5>
                      <p className="card-text">
                        <strong>Email:</strong> {job.userEmail}<br />
                        <strong>Experience:</strong> {job.jobDetails.jobExperience}<br />
                        <strong>Salary:</strong> {job.jobDetails.jobSalary}<br />
                        <strong>Type:</strong> {job.jobDetails.jobType}
                      </p>
                      <Button className="left" onClick={() => acceptApplication(job.id)}>Accept</Button>
                      <Button className="left lef-mr" onClick={() => rejectApplication(job.id)}>Reject</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage;






