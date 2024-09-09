
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabContent, TabPane } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Add your custom styles here
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firestore, } from "../../../Config/ConfigFirebase.js";
import { FaHome,FaUsers,FaFileAlt  } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAutoGraph } from "react-icons/md";
import Sidebar from "./Sidebar.jsx";



function LocationPage() {

    const navigate = useNavigate();
    const [userId,seId] = useState('')
    const [userdata,setUserdata] = useState('')


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

   return(
    <div>
        <div>
            <div className="row">
            <div className="col-3  p-0 ">
                    <Sidebar/>
                </div>
                <div className="col-9">
                    <h2>Location</h2>
                    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.201848206776!2d68.36211867457265!3d25.396135677362866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIzJzQ2LjEiTiA2OMKwMjEnNDMuNyJF!5e0!3m2!1sen!2s!4v1638124645615!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
                </div>
            </div>
        </div>
    </div>
   )
}

export default LocationPage;






