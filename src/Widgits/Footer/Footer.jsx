import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.css'; // Link to your CSS file

const Footer = () => {
    return (
        <div>
             <div style={{ width: '100%', height: '400px' }}>
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

        <footer className="bg-dark text-light pt-5">
            <div className="container">
                <div className="row">
                    {/* Company Info */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">
                            <span className="text-black">Say</span>lani
                        </h5>
                        <p className='footerPara'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam repellendus sunt praesentium aspernatur iure molestias.
                        </p>
                        <p className="mb-2 footerPara" >We Accept</p>
                        <div className="d-flex">
                            <FaCcVisa size="2em" className="me-2" />
                            <FaCcMastercard size="2em" className="me-2" />
                            <FaCcPaypal size="2em" className="me-2" />
                        </div>
                    </div>

                    {/* Domain Links */}
                    <div className="col-md-2 mb-4">
                        <h5 className="text-uppercase mb-3">Links</h5>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/project">Project</Link></li>
                        </ul>
                    </div>

                    {/* Hosting Links */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase mb-3">Contact</h5>
                        <ul className="list-unstyled footer-links">
                            <li><a href="tel:+0000000">+00-00000</a></li>
                            <li><a href="mailto:saylani@gmail.com">saylani@gmail.com</a></li>
                            <li><a  href="https://www.google.com/maps?q=99X8+25Q,+Dadan+Shah+Hyderabad,+Sindh" target="_blank" rel="noopener noreferrer">
                                99X8+25Q, Dadan Shah Hyderabad, Sindh</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase mb-3">Newsletter</h5>
                        <p className='footerPara'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur doloremque earum similique fugiat nobis.
                        </p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Recipient's username" />
                            <Link className='footer-btn' to={'/signup'}>Subscribe</Link>
                        </div>
                        <h5>Follow us on</h5>
                        <div className="d-flex">
                            <FaFacebookF className="me-3" size="1.5em" />
                            <FaTwitter className="me-3" size="1.5em" />
                            <FaPinterestP className="me-3" size="1.5em" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default Footer;
