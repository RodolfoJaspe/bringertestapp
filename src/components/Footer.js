import React from 'react';
import "../styles/Footer.css";
import bps from "../assets/images/bps.png";
import twitter from "../assets/images/twitter.png";
import insta from "../assets/images/insta.png";
import youtube from "../assets/images/youtube.png";
import fb from "../assets/images/fb.png";
import BAC from "../assets/images/BAC.png";

function Footer() {
  return (
    <footer className='app-footer'>
        <div className='footer-inner'>
            <div className='bps-img-div'>
                <img src={bps} alt="bps" />
            </div>
            <div className='footer-main'>
                <div className='footer-main-col'>
                    <h3>Bringer Parcel Services</h3><br/>
                    <p>1-888-327-4643</p>
                    <p>305-592-5427</p>
                    <p>bps@bringer.com</p>
                </div>
                <div className='footer-main-col'>
                    <h3>Company</h3><br/>
                    <p>About Us</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                </div>
                <div className='footer-main-col'>
                    <h3>Shipping</h3><br/>
                    <p>Prohibited Items</p>
                    <p>Perfumes</p>
                    <p>Lithium Batteries</p>
                </div>
                <div className='footer-main-col'>
                    <h3>Help</h3><br/>
                    <p>Start Shipping</p>
                    <p>Tracking</p>
                    <p>Claims</p>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='social-div'>
                    <img src={fb} alt="facebook logo" />
                    <img src={twitter} alt="twitter logo" />
                    <img src={insta} alt="instagram logo" />
                    <img src={youtube} alt="youtube logo" /> 
                </div>
                <div  className='BAC-div'>
                    <p>BPS is a division of</p>
                    <img src={BAC} alt="BAC"/>
                </div>
            </div> 
        </div>
    </footer>
  )
}

export default Footer