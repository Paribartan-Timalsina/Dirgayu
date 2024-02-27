import React from 'react';
import './home.css';
import backgroundImg from '../Assets/background.jpg';
import logo from '../Assets/logo.png';
import {Link} from "react-router-dom"
function Home() {
  return (
  <div>
    <div className='header'>

          <div className="hero">

            <div className='hero-content'>

            <h1>Welcome to Dirghayu</h1>
            <p>a smart approach for EHRs</p>

            </div>

            <div className="buttons">
              <button> <Link to="/signin">Login</Link></button>
             <button><Link to="/signup">Sign Up</Link></button>
             </div>

          </div>



      <div>
        <section className="features">
          <h3>Features</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
         <div className='row'>
          <div className='col'>
            <h4>Electronic Health Records</h4>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elitUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur </p>
          </div>
          <div className='col'>
            <h4>Appointment Scheduling</h4>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur </p>
          </div>
          <div className='col'>
            <h4>Pescription Scheduling</h4>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur </p>         
             </div>
          <div className='col'>
            <h4>Billing and Claims</h4>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur </p>          
            </div>
         </div>
        </section>
      </div>
        
        <section className="footer">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget eros quam. Cras non tortor non magna consectetur gravida eu vel felis.</p>
        </section>
        </div>
    </div>
  );
}

export default Home;
