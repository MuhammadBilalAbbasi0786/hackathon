import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './style.css';
import UserNavbar from '../../../Widgits/UsreNavbar/UsreNavbar';
import UserFooter from '../../../Widgits/UserFooter/UserFooter';
import { firestore } from '../../../Config/ConfigFirebase';
import { ToastContainer } from 'react-toastify';

function Ourjobs() {
    const navigate = useNavigate();
    const [userId, seId] = useState('');
    const [userdata, setUserdata] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('object'));

        if (adminData) {
            seId(adminData.userId);
            let id = adminData.userId;

            if (!id) {
                navigate('/signin');
            } else {
                console.log('User ID:', id);
            }
        } else {
            navigate('/signin');
        }
    }, [navigate]);

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

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                // Fetch the user's applied jobs from jobApplications collection
                const appliedSnapshot = await firestore.collection('jobApplications')
                    .where('userId', '==', userId)
                    .get();

                const appliedJobsList = [];
                appliedSnapshot.forEach(doc => {
                    const applicationData = doc.data();
                    appliedJobsList.push({
                        ...applicationData.jobDetails, // Spread job details
                        applicationStatus: applicationData.applicationStatus // Include status from jobApplications
                    });
                });
                
                setAppliedJobs(appliedJobsList); // Set applied jobs in state
            } catch (e) {
                console.error('Error fetching applied jobs:', e);
            }
        };
        
        if (userId) {
            fetchAppliedJobs();
        }
    }, [userId]);

    return (
        <div>
            <UserNavbar />
            <div className="banner">
                <div className="uerspading">
                <div className="max-width">
                    <div className="banner-inner">
                        <div className="row">
                            <div className="banner-content">
                                <h1><span className="text-black">OurJobs</span> With Status</h1>
                                <p className="center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis temporibus provident quod dolore suscipit obcaecati! Nobis quasi architecto corporis magnam praesentium tempora eligendi quaerat cupiditate voluptas fugit eum, iusto natus eius sint veniam vel nemo temporibus! Error veniam molestiae explicabo similique officia quisquam quaerat repellat cum, ipsa et dicta at.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row margin">
                        {appliedJobs.length > 0 ? appliedJobs.map((job, index) => (
                            <div key={index} className="col-12 col-md-4 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{job.jobCategory}</Card.Title>
                                        <Card.Text>
                                            <strong>Level:</strong> {job.jobLevel}<br />
                                            <strong>Experience:</strong> {job.jobExperience}<br />
                                            <strong>Salary:</strong> {job.jobSalary}<br />
                                            <strong>Type:</strong> {job.jobType}<br />
                                            <strong>Status:</strong> {job.applicationStatus} {/* Show application status */}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )) : (
                            <p>No jobs found that you have applied for.</p>
                        )}
                    </div>
                </div>
                </div>
            </div>
            <UserFooter />
            <ToastContainer />
        </div>
    );
}

export default Ourjobs;
