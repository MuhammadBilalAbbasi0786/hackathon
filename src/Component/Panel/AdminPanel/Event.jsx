import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Add your custom styles here
import { useNavigate } from "react-router-dom";
import { firestore } from "../../../Config/ConfigFirebase.js";
import firebase from "firebase/compat/app";
import Sidebar from "./Sidebar.jsx";
import { IoIosAddCircle } from "react-icons/io";
import { MdAutoDelete } from "react-icons/md";

function EventPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  // State variables to track the form inputs
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

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

  // Handle modal open and close
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle form submission for events
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventKey = firebase.database().ref("events").push().getKey();
    const eventObject = {
      eventName,
      eventDate,
      eventLocation,
      eventKey
    };

    // Close modal after form submission
    handleClose();

    await firestore.collection('events').doc(eventKey).set(eventObject)
      .then(() => {
        alert('Event added successfully');
        setEvents([...events, eventObject]);
      })
      .catch((e) => {
        alert(e);
      });
  };

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

  // Delete event from Firebase
  const DeleteEvent = async (eventId) => {
    try {
      await firestore.collection('events').doc(eventId).delete();
      setEvents(events.filter(event => event.eventKey !== eventId));
      alert('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete the event.');
    }
  };

  return (
    <div className="padding-new">
      <div className="row">
        <div className="col-3 p-0">
          <Sidebar />
        </div>
        <div className="col-9">
          <div className="row new-b">
            <div className="col-6 col-md-6">
              <h2>Add Events</h2>
            </div>
            <div className="col-6 col-md-6 d-flex justify-content-end">
              <Button className="left small" onClick={handleShow}>
                <IoIosAddCircle className="addbtn" /> Add Event
              </Button>
            </div>
          </div>

          {/* Render event cards */}
          <div className="row">
            {events.map((event, index) => (
              <div className="col-12 col-md-6 mb-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text">
                      <strong>Date:</strong> {event.eventDate}<br />
                      <strong>Location:</strong> {event.eventLocation}
                    </p>
                    <Button className="left" onClick={() => DeleteEvent(event.eventKey)}>
                      Delete Event <MdAutoDelete />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding Events */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="eventDate">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="eventLocation">
              <Form.Label>Event Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventPage;
  