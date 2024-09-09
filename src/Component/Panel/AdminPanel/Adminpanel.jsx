import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Add your custom styles here
import { useNavigate } from "react-router-dom";
import { firestore, db } from "../../../Config/ConfigFirebase.js";
import firebase from "firebase/compat/app";
import Sidebar from "./Sidebar.jsx";
import { IoIosAddCircle } from "react-icons/io";
import { MdAutoDelete } from "react-icons/md";


function AdminPanel() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userdata, setUserdata] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);


  // State variables to track the form inputs
  const [jobCategory, setJobCategory] = useState('Front end Developer'); // Default category
  const [jobLevel, setJobLevel] = useState('Senior'); // Default level
  const [jobExperience, setJobExperience] = useState('6 Montnh'); // Default experience
  const [jobType, setJobType] = useState('fulltime');
  const [jobSalary, setJobSalary] = useState('20k to 20k');

  // To get user data and set condition for id to navigate sign-in page
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('object'));

    if (adminData) {
      setUserId(adminData.userId);

      if (!adminData.userId) {
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  // To get user data from Firebase
  useEffect(() => {
    const GetUser = async () => {
      if (userId) {
        try {
          const snap = await firestore.collection('users').doc(userId).get();
          if (snap.exists) {
            setUserdata(snap.data());
          }
        } catch (e) {
          console.error('Error fetching user data:', e);
        }
      }
    };
    GetUser();
  }, [userId]);

  // Handle modal open and close
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(jobCategory)


    var jobsKey = firebase.database().ref("jobs").push().getKey()
    console.log(jobsKey)

    var jobObject = {
      jobCategory,
      jobLevel,
      jobExperience,
      jobType,
      jobSalary,
      jobsKey

    }

    // Close modal after form submission
    handleClose();

    await firestore.collection('jobs').doc(jobsKey).set(jobObject)
      .then((snap) => {
        alert('Job added successfull')
        setJobs([...jobs, jobObject]);
      })
      .catch((e) => {
        alert(e)
      })

    console.log(jobObject);



  };


  // to get all jobs from firebase

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await firestore.collection('jobs').get();
        const jobsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (e) {
        console.error('Error fetching jobs:', e);
      }
    };
    fetchJobs();
    console.log(jobs)
  }, []);

  // end

  // delate jobs from firebase
  const DeleteJob = async (jobId) => {
    try {
      // Delete the job from Firebase
      await firestore.collection('jobs').doc(jobId).delete();

      // Update the state to remove the deleted job
      setJobs(jobs.filter(job => job.jobsKey !== jobId));

      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete the job.');
    }
  };
  // delate jobs from firebase

  return (
    <div className="padding-new">
      <div className="row">
        <div className="col-3 p-0">
          <Sidebar />
        </div>
        <div className="col-9">
          <div className="row new-b">
            <div className="col-6 col-md-6">
              <h2>Add Jobs</h2>
            </div>
            <div className="col-6 col-md-6 d-flex justify-content-end">
              <Button className="left" onClick={handleShow}>
                <IoIosAddCircle className="addbtn" /> Add Jobs
              </Button>
            </div>
          </div>

          {/* render jobs card */}

          <div className="row">
            {jobs.map((job, index) => (
              <div className="col-12 col-md-6 mb-3 ml-3 padding-left" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{job.jobCategory}</h5>
                    <p className="card-text">
                      <strong>Level:</strong> {job.jobLevel}<br />
                      <strong>Experience:</strong> {job.jobExperience}<br />
                      <strong>Salary:</strong> {job.jobSalary}<br />
                      <strong>Type:</strong> {job.jobType}
                    </p>
                    <Button id={job.jobsKey} className="left" onClick={() => DeleteJob(job.jobsKey)}>Delete Job <MdAutoDelete /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding Jobs */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Job Category */}
            <Form.Group controlId="jobCategory">
              <Form.Label>Job Category</Form.Label>
              <Form.Control as="select" value={jobCategory} onChange={(e) => setJobCategory(e.target.value)}>
                <option value="" disabled>Select Job Category</option>
                <option value="Front-end Developer">Front-end Developer</option>
                <option value="Back-end Developer">Back-end Developer</option>
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="React Native Developer">React Native Developer</option>
                <option value="MERN Stack Developer">MERN Stack Developer</option>
              </Form.Control>
            </Form.Group>

            {/* Job Level */}
            <Form.Group controlId="jobLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control as="select" value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
                <option value="" disabled>Select Level</option>
                <option value="senior">Senior</option>
                <option value="junior">Junior</option>
                <option value="intern">Intern</option>
                <option value="expert">Expert</option>
              </Form.Control>
            </Form.Group>

            {/* Job Experience */}
            <Form.Group controlId="jobExperience" >
              <Form.Label>Experience</Form.Label>
              <Form.Control as="select" value={jobExperience} onChange={(e) => setJobExperience(e.target.value)}>
                <option value="" disabled>Select Experience</option>
                <option value="6months">6 Months</option>
                <option value="1to2years">1 to 2 Years</option>
                <option value="3to4years">3 to 4 Years</option>
              </Form.Control>
            </Form.Group>

            {/* Job Type */}
            <Form.Group controlId="jobSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control as="select" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)}>
                <option value="" disabled> Salary</option>
                <option value="50k">50k to 70k</option>
                <option value="70k">70k to 80k</option>
                <option value="80k">80k to 90k</option>
                <option value="90k">90k to 150k</option>
              </Form.Control>
            </Form.Group>

            {/* Job Type */}
            <Form.Group controlId="jobType">
              <Form.Label>Job Type</Form.Label>
              <Form.Control as="select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="" selected>Select Job Type</option>
                <option value="fulltime">Full-Time</option>
                <option value="parttime">Part-Time</option>
                <option value="contract">Contract</option>
              </Form.Control>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default AdminPanel;