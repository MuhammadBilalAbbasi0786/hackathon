
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
import png1 from '../../../Assets/graph 1.png'
import png2 from '../../../Assets/graph 2.png'
import png3 from '../../../Assets/graph 3.png'
import png4 from '../../../Assets/graph 4.png'
import Sidebar from "./Sidebar.jsx";




function GraphPage() {

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
        <div className="padding-new">
            <div className="row">
                {/* <div className="col-3 bgtab">
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
                                    <FaUsers className="tab-icon" /> <span className="tab-text">User</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/category'}>
                                <div className="tabs">
                                    <BiSolidCategory className="tab-icon" /> <span className="tab-text">Category</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/files'}>
                                <div className="tabs">
                                    <FaFileAlt className="tab-icon" /> <span className="tab-text">Files</span>
                                </div>
                                </Link>
                            </div>
                            <div className="tab-inner">
                                <Link to={'/notification'}>
                                <div className="tabs">
                                    <IoMdNotifications className="tab-icon" /> <span className="tab-text">Notification</span>
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
                </div> */}
                 <div className="col-3  ">
                    <Sidebar/>
                </div>
                <div className="col-9 ">
                   <div className="right-1">
                   <h2>Graph</h2>
                    <div className="row ">
                        <div className="col-12 col-md-6 col-sm-12"><img src={png1} alt="draph" className="graph" /></div>
                        <div className="col col-md-6 col-sm-12"><img src={png2} alt="draph" className="graph" /></div>
                    </div>
                    <div className="row mt-4 ">
                        <div className="col col-md-6 col-sm-12"><img src={png3} alt="draph" className="graph" /></div>
                        <div className="col col-md-6 col-sm-12"><img src={png4} alt="draph" className="graph" /></div>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
   )
}

export default GraphPage;






