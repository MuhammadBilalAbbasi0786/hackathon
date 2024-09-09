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

function JoiningEvent() {
    const navigate = useNavigate();
    const [userId, seId] = useState('');
    const [userdata, setUserdata] = useState('');
    const [joinedEvents, setJoinedEvents] = useState([]);

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
        const fetchJoinedEvents = async () => {
            try {
                // Fetch the events the user has joined from eventJoins collection
                const joinedSnapshot = await firestore.collection('eventJoins')
                    .where('userId', '==', userId)
                    .get();

                const joinedEventsList = [];
                joinedSnapshot.forEach(doc => {
                    const joinData = doc.data();
                    joinedEventsList.push({
                        ...joinData.eventDetails, // Spread event details
                        joinStatus: joinData.joinStatus // Include status from eventJoins
                    });
                });

                setJoinedEvents(joinedEventsList); // Set joined events in state
            } catch (e) {
                console.error('Error fetching joined events:', e);
            }
        };

        if (userId) {
            fetchJoinedEvents();
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
                                <h1><span className="text-black">Your Joined Events</span></h1>
                                <p className="center">
                                    Here are the events you have joined.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row margin">
                        {joinedEvents.length > 0 ? joinedEvents.map((event, index) => (
                            <div key={index} className="col-12 col-md-4 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{event.eventCategory}</Card.Title>
                                        <Card.Text>
                                            <strong>Date:</strong> {event.eventDate}<br />
                                            <strong>Location:</strong> {event.eventLocation}<br />
                                            <strong>Description:</strong> {event.eventDescription}<br />
                                            <strong>Status:</strong> {event.joinStatus} {/* Show join status */}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )) : (
                            <p>No events found that you have joined.</p>
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

export default JoiningEvent;
