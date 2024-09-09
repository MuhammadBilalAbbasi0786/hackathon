import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Add your custom styles here
import { useNavigate } from "react-router-dom";
import { firestore } from "../../../Config/ConfigFirebase.js";
import Sidebar from "./Sidebar.jsx";

function NotificationPage() {

  const navigate = useNavigate();
  const [userId, seId] = useState('');
  const [userdata, setUserdata] = useState('');
  const [joinedEvents, setJoinedEvents] = useState([]);  // Holds joined event data

  // Fetch admin data and navigate to sign-in if not logged in
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('object'));

    if (adminData) {
      seId(adminData.userId);

      let id = adminData.userId;

      if (!id) {
        navigate('/signin'); // Redirect to sign-in if no admin ID found
      } else {
        console.log('User ID:', id);
      }
    } else {
      navigate('/signin'); // Redirect to sign-in if no admin data found
    }
  }, [navigate]);

  // Fetch user data from Firebase
  useEffect(() => {
    const GetUser = async () => {
      if (userId) {
        try {
          const snap = await firestore.collection('users').doc(userId).get();
          if (snap.exists) {
            console.log('User data:', snap.data()); // Log user data
            setUserdata(snap.data());
          } else {
            console.log('No such user found');
          }
        } catch (e) {
          console.error('Error fetching user data:', e);
        }
      }
    };
    GetUser();
  }, [userId]);

  // Fetch all users who joined an event from Firebase
  const fetchJoinedEvents = async (status) => {
    try {
      let query = firestore.collection('eventJoins'); // Adjust to your collection for event joiners
      if (status && status !== 'all') {
        query = query.where('status', '==', status);  // Filter by status if applicable
      }
      const snapshot = await query.get();
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJoinedEvents(eventsList);
    } catch (e) {
      console.error('Error fetching joined events:', e);
    }
  };

  useEffect(() => {
    fetchJoinedEvents('all'); // Fetch all joined events on component mount
  }, []);

  return (
    <div>
      <div className="padding-new">
        <div className="row">
          <div className="col-3 p-0">
            <Sidebar />
          </div>
          <div className="col-9">
            <div className="row">
              
                <h1>Event Participants</h1>
              
            </div>

            <div className="row">
              <div>
                <div className="row">
                  {joinedEvents.map((event, index) => (
                    <div className="col-12 col-md-4 mb-3" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <img src={event.userImage} className="applicationImage" alt="User" />
                          <h5 className="card-title">Joined Event: {event.eventDetails.eventName}</h5>
                          <p className="card-text">
                            <strong>Email:</strong> {event.userEmail}<br />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
