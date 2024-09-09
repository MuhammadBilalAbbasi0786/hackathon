import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './style.css';
import UserNavbar from '../../../Widgits/UsreNavbar/UsreNavbar';
import UserFooter from '../../../Widgits/UserFooter/UserFooter';
import { firestore } from '../../../Config/ConfigFirebase';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function EventUser() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [userdata, setUserdata] = useState('');
    const [events, setEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState({});
    const [joiningEventId, setJoiningEventId] = useState(null);

    // Fetch user info from localStorage
    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('object'));

        if (adminData) {
            setUserId(adminData.userId);
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

    // Fetch user data
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

    // Fetch all events from Firebase
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const snapshot = await firestore.collection('events').get();
                const eventsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventsList);
            } catch (e) {
                console.error('Error fetching events:', e);
            }
        };
        fetchEvents();
    }, []);

    // Handle event join
    const GoinEvent = async (event) => {
        console.log(event);

        setJoiningEventId(event.id);

        if (!userdata) {
            console.error('User data is not available');
            return;
        }

        try {
            const { email, imageUrl } = userdata;

            // Check if the user has already joined this event
            const existingJoin = await firestore.collection('eventJoins')
                .where('userId', '==', userId)
                .where('eventId', '==', event.id)
                .get();

            if (!existingJoin.empty) {
                // If already joined, notify the user
                toast('You have already joined this event.', {
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

            // Proceed to create a new join reference
            const eventJoinKey = firestore.collection('eventJoins').doc().id;

            await firestore.collection('eventJoins').doc(eventJoinKey).set({
                eventId: event.id,
                userId: userId,
                userEmail: email,
                userImage: imageUrl,
                eventDetails: event,
                joinStatus: 'joined',
                eventJoinKey
            });

            setJoinedEvents(prev => ({ ...prev, [event.id]: true }));
            toast('Successfully joined the event!', {
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
            console.error('Error joining event:', e);
            toast('Failed to join the event', {
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

    // Get button text based on whether the user has joined the event
    const getButtonText = (eventId) => {
        return joinedEvents[eventId] ? 'Joined' : 'Join Event';
    };

    return (
        <div>
            <UserNavbar />
            <div className="banner">
                <div className="max-width">
                    <div className="banner-inner">
                        <div className="row">
                            <div className="banner-content">
                                <h1><span className="text-black">Saylani</span> Hackathon Project</h1>
                                <p className="center">
                                    Join various exciting events and be a part of something great!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row margin">
                        {events.map((event, index) => (
                            <div key={index} className="col-12 col-md-4 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{event.eventCategory}</Card.Title>
                                        <Card.Text>
                                            <strong>Date:</strong> {event.eventDate}<br />
                                            <strong>Location:</strong> {event.eventLocation}<br />
                                            <strong>Description:</strong> {event.eventDescription}
                                        </Card.Text>
                                        <Button
                                            variant={joinedEvents[event.id] ? 'secondary' : 'primary'}
                                            onClick={() => GoinEvent(event)}
                                            disabled={joinedEvents[event.id] || joiningEventId === event.id}
                                        >
                                            {getButtonText(event.id)}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <UserFooter />
            <ToastContainer />
        </div>
    );
}

export default EventUser;
