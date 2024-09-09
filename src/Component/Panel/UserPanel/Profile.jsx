import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import './style.css';
import UserNavbar from '../../../Widgits/UsreNavbar/UsreNavbar';
import UserFooter from '../../../Widgits/UserFooter/UserFooter';
import { firestore } from '../../../Config/ConfigFirebase';

function Profile() {
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

    

    return (
        <div>
            <UserNavbar />
            <div className="banner">
                <div className="max-width">
                    {/* <div className="banner-inner">
                        <div className="row">
                            <div className="banner-content">
                                <h1><span className="text-black">Saylani</span> Hackathon Project</h1>
                                <p className="center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis temporibus provident quod dolore suscipit obcaecati! Nobis quasi architecto corporis magnam praesentium tempora eligendi quaerat cupiditate voluptas fugit eum, iusto natus eius sint veniam vel nemo temporibus! Error veniam molestiae explicabo similique officia quisquam quaerat repellat cum, ipsa et dicta at.
                                </p>
                            </div>
                        </div>
                    </div> */}

                    <div>
                        <div className='main-profile'>
                            <div  className='inner-profile'>
                                <img  className='profileimage' src={userdata.imageUrl} alt="" />
                                <h2>{userdata.userName}</h2>
                                <h5>{userdata.email}</h5>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <UserFooter />
           
        </div>
    );
}

export default Profile;
