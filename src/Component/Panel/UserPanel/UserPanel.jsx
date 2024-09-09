import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './style.css';
import UserNavbar from '../../../Widgits/UsreNavbar/UsreNavbar';
import UserFooter from '../../../Widgits/UserFooter/UserFooter';
import { firestore } from '../../../Config/ConfigFirebase';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function UserPanel() {
    const navigate = useNavigate();
    const [userId, seId] = useState('');
    const [userdata, setUserdata] = useState('');
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState({});
    const [applyingJobId, setApplyingJobId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

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
    }, []);

    // To Apply Job Function start

    const handleJobClick = async (job) => {

        console.log(job)

        setApplyingJobId(job.id);

        if (!userdata) {
            console.error('User data is not available');
            return;
        }


        try {
            const { email, imageUrl } = userdata;

            // Check if the user has already applied for this job
            const existingApplication = await firestore.collection('jobApplications')
                .where('userId', '==', userId)
                .where('jobId', '==', job.id)
                .get();

            if (!existingApplication.empty) {
                // If there's already an application, notify the user
               
                toast('You have already applied for this job.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }

            // Proceed to create a new application
            const jobApplicationsKey = firestore.collection('jobApplications').doc().id; // Use Firestore for unique IDs

            await firestore.collection('jobApplications').doc(jobApplicationsKey).set({
                jobId: job.id,
                userId: userId,
                userEmail: email,
                userImage: imageUrl,
                jobDetails: job,
                applicationStatus: 'pending',
                jobApplicationsKey
            });
            setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
            toast('Application submitted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (e) {
            console.error('Error submitting application:', e);
            toast('Failed to submit application', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    // To Apply Job Function end

    // apply button text
    const getButtonText = (jobId) => {
        return appliedJobs[jobId] ? 'Applied' : 'Apply';
    };

    // select funtion 
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // filter slection
    const filteredJobs = selectedCategory === 'All'
        ? jobs
        : jobs.filter(job => job.jobCategory === selectedCategory);

    return (
        <div >
            <UserNavbar />
            <div className="banner ">
                <div className="uerspading">
                <div className="max-width">
                    <div className="banner-inner">
                        <div className="row">
                            <div className="banner-content">
                                <h1><span className="text-black">Saylani</span> Hackathon Project</h1>
                                <p className="center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis temporibus provident quod dolore suscipit obcaecati! Nobis quasi architecto corporis magnam praesentium tempora eligendi quaerat cupiditate voluptas fugit eum, iusto natus eius sint veniam vel nemo temporibus! Error veniam molestiae explicabo similique officia quisquam quaerat repellat cum, ipsa et dicta at.
                                </p>
                        
                                        <Form.Group className="withd-new">
                                            <Form.Label>Select Job Category</Form.Label>
                                            <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                                                <option value="All">All Categories</option>
                                                <option value="Full-Stack Developer">Full-Stack Developer</option>
                                                <option value="React Native Developer">React Native Developer</option>
                                                <option value="MERN Stack Developer">MERN Stack Developer</option>
                                                <option value="Front-end Developer">Front-end Developer</option>
                                                <option value="Back-end Developer">Back-end Developer</option>
                                            </Form.Select>
                                        </Form.Group>
                                    
                            </div>
                        </div>
                    </div>

                    <div className="row margin">
                        {filteredJobs.map((job, index) => (
                            <div key={index} className="col-12 col-md-4 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{job.jobCategory}</Card.Title>
                                        <Card.Text>
                                            <strong>Level:</strong> {job.jobLevel}<br />
                                            <strong>Experience:</strong> {job.jobExperience}<br />
                                            <strong>Salary:</strong> {job.jobSalary}<br />
                                            <strong>Type:</strong> {job.jobType}
                                        </Card.Text>
                                        <Button
                                            variant={appliedJobs[job.id] ? 'secondary' : 'primary'}
                                            onClick={() => handleJobClick(job)}
                                            disabled={appliedJobs[job.id] || applyingJobId === job.id} // Disable button if already applied or if application is in progress
                                        >
                                            {getButtonText(job.id)}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
            <UserFooter />
            <ToastContainer />
        </div>
    );
}

export default UserPanel;
