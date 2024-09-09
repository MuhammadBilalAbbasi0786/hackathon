
import React, { useEffect, useState } from "react";
import './admin.css'; // Add your custom styles here
import { Link, useNavigate } from "react-router-dom";
import { firestore, } from "../../../Config/ConfigFirebase.js";
import { FaHome,FaUsers,FaFileAlt  } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAutoGraph } from "react-icons/md";



function Sidebar() {

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
    
                <div className=" bgtab">
                    <div className="left-box">
                        <div className="userBox">
                            <img src={userdata.imageUrl} className="dashboardUserImage" alt="error" />
                            <h2 className="username">{userdata.userName}</h2>
                            <p><b className="useremail">{userdata.email}</b></p>
                        </div>
                        <div className="dashboard-tab">
                            <div className="tab-inner">
                                <Link to={'/adminpanel'}>
                                <div className="tabs">
                                    <FaHome className="tab-icon" /> <span className="tab-text">Home</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/user'}>
                                <div className="tabs">
                                    <FaUsers className="tab-icon" /> <span className="tab-text">Applications</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/category'}>
                                <div className="tabs">
                                    <BiSolidCategory className="tab-icon" /> <span className="tab-text">App Status</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/files'}>
                                <div className="tabs">
                                    <FaFileAlt className="tab-icon" /> <span className="tab-text">Event</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/notification'}>
                                <div className="tabs">
                                    <IoMdNotifications className="tab-icon" /> <span className="tab-text">Join Users</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/location'}>
                                <div className="tabs">
                                    <IoLocation className="tab-icon" /> <span className="tab-text">Location</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/graph'}>
                                <div className="tabs">
                                    <MdOutlineAutoGraph className="tab-icon" /> <span className="tab-text">Graph</span>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            
   )
}

export default Sidebar;






