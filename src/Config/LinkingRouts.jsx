import { Route, Routes } from "react-router-dom"
import Home from "../Component/Home"
import About from "../Component/About"
import SignUp from "../Component/SignUp"
import SignIn from "../Component/SignIn"
import UserPanel from "../Component/Panel/UserPanel/UserPanel"
import AdminPanel from "../Component/Panel/AdminPanel/Adminpanel"
import Pricing from "../Component/Pricing"
import Project from "../Component/Project"
import UserPage from "../Component/Panel/AdminPanel/User"
import CategoryPage from "../Component/Panel/AdminPanel/Category"
import NotificationPage from "../Component/Panel/AdminPanel/Notification"
import LocationPage from "../Component/Panel/AdminPanel/Location"
import GraphPage from "../Component/Panel/AdminPanel/Graph"
import Ourjobs from "../Component/Panel/UserPanel/Ourjobs"
import Profile from "../Component/Panel/UserPanel/Profile"
import EventPage from "../Component/Panel/AdminPanel/Event"
import EventUser from "../Component/Panel/UserPanel/EventUser"
import JoiningEvent from "../Component/Panel/UserPanel/JoiningEvent"

function LinkingRouts(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/pricing" element={<Pricing/>} />
                <Route path="/project" element={<Project/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/adminpanel" element={<AdminPanel/>} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/category" element={<CategoryPage/>} />
                <Route path="/files" element={<EventPage/>} />
                <Route path="/notification" element={<NotificationPage/>} />
                <Route path="/location" element={<LocationPage/>} />
                <Route path="/graph" element={<GraphPage/>} />
                <Route path="/userpanel" element={<UserPanel/>} />
                <Route path="/ourjobs" element={<Ourjobs/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/eventuser" element={<EventUser/>} />
                <Route path="/joinngevet" element={<JoiningEvent/>} />

            </Routes>
        </div>
    )
}

export default LinkingRouts