
import React, { useState } from "react";
import './PatientSignUp.css';
import logo from '../Assets/logo.png';
import { useNavigate } from "react-router-dom";
const Patientsignup = ({account,contract,provider}) => {
  const navigate = useNavigate();
    const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [houseaddr, setHouseaddr] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medication, setMedication] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

        const patientDetails = {
          name,
          phone,
          gender,
          dob,
          height,
          weight,
          houseaddr,
          bloodgroup,
          
          emergencyName,
          emergencyContact,
        };

        await contract.setPatientDetails(patientDetails);
        navigate("/fileupload")
      
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container">

    <div className='logo-img'>
          <img src={logo} className="Web-Logo" alt="logo" />
    </div>
    <h1>
      Patient Registration
    </h1>
      <form onSubmit={handleSubmit}>
      <div className="patient-details"> 
        <label className="input-box1">
          <span>Name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
         <span> Phone</span> 
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
          <span>Gender</span>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
          <span>Date of Birth</span>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
          <span>Height</span>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
          <span>Weight</span>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
          <span>House Address</span>
          <input type="text" value={houseaddr} onChange={(e) => setHouseaddr(e.target.value)} />
        </label>
        <br />
        <label className="input-box1">
          <span>Blood Group</span>
          <input type="text" value={bloodgroup} onChange={(e) => setBloodgroup(e.target.value)} />
        </label>
        <br />
        
      
        <label className="input-box1">
          <span>Emergency Contact Name</span>
          <input
            type="text"
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
          />
        </label>
        <br />
        <label className="input-box1">
          <span>Emergency Contact</span>
          <input
            type="number"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
        </label>
        <br />
      </div>
        <input type="submit" value="Register" className="btn4" />
      </form>
    </div>
  )
}

export default Patientsignup
