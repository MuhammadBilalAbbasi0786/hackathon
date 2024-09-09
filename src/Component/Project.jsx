import React from "react"
import MainNavbar from "../Widgits/Navbar/Navbar"
import './style.css'
import Footer from "../Widgits/Footer/Footer"


function Project(){
    return(
        <div>
            <MainNavbar/>
            <div className="banner">
                <div className="max-width" >
                    <div className="banner-inner">
                        <div className="row">
                                <div className="banner-content">
                                <h1>  <span className="text-black">Saylani</span> Projects </h1>
                                    <p className="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis temporibus provident quod dolore suscipit obcaecati! Nobis quasi architecto corporis magnam praesentium tempora eligendi quaerat cupiditate voluptas fugit eum, iusto natus eius sint veniam vel nemo temporibus! Error veniam molestiae explicabo similique officia quisquam quaerat repellat cum, ipsa et dicta at.
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Project 