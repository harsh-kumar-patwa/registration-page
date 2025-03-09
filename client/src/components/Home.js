import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const yourName = "Harsh Kumar"; 
    const resumeLink = "https://drive.google.com/file/d/15Fl2xzMB2mAJh8JfSHgoCP8FPP-JiS7t/view?usp=sharing"; 
    return (
        <div className="home-container">
            <div className="hero-content">
                <h1>Hi, Welcome to FinacPlus Internship Project</h1>
                <h2 className="presented-by">Presented by {yourName}</h2>
                <p>Get yourself registered under my project and start your journey with us</p>
                <div className="hero-buttons">
                    <Link to="/register"><button className="register-button">Register Now</button></Link>
                    <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                        <button className="learn-more-button">Learn More</button>
                    </a>
                </div>
            </div>
            <div className="features">
                <div className="feature">
                    <span className="material-symbols-outlined feature-icon">
                        procedure
                    </span>
                    <p>Easy Process</p>
                </div>
                <div className="feature">

                    <span className="material-symbols-outlined feature-icon">
                        quick_reference
                    </span>
                    <p>Quick Setup</p>
                </div>
                <div className="feature">
                    <span className="material-symbols-outlined feature-icon">
                        verified_user
                    </span>
                    <p>Secure Platform</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
