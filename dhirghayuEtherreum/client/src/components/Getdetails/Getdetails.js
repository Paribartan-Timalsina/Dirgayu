import React, { useEffect, useState } from 'react';
import axios from "axios"
import { BigNumber } from 'bignumber.js';
import { useNavigate } from "react-router-dom";
import PatientIcon from "../Doctoricon/PatientIcon"
import DoctorIcon from "../Doctoricon/DoctorIcon"
import "./Getdetails.css" // import your CSS file here

const Getdetails = ({ account, contract, provider }) => {
  const navigate = useNavigate();
  const[appointmentdates,setAppointmentdates]=useState()
  const[ispatient,setaspatient]=useState()
  const[isdoctor,setasdoctor]=useState()
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');
  const [treatments, setTreatments] = useState([]);
  
  useEffect(()=>{
    //handleGetDetails();
  },[])
  const handleGetDetails = async () => {
    try {
      console.log(account);

      const isPatient = await contract.isPatients(account);
      const isDoctor = await contract.isDoctors(account);
      setaspatient(isPatient)
      setasdoctor(isDoctor)
      console.log(isPatient);
      console.log(isDoctor);

      if (isPatient) {
        const patientDetails = await contract.getPatientDetails();
        const patientdiagnosis=await contract.getTreatments();
        (await contract.getPatientName())
        setTreatments(patientdiagnosis)
        console.log(patientdiagnosis)
        console.log(patientDetails)
        const modifiedDetails = patientDetails.map((value) =>
          BigNumber.isBigNumber(value) ? value.toNumber() : value
        );
        setDetails(modifiedDetails);
      } else if (isDoctor) {
        
        const doctorDetails = await contract.getDoctorDetails();
        console.log(doctorDetails)
        const modifiedDetails = doctorDetails.map((value) =>
          BigNumber.isBigNumber(value) ? value.toNumber() : value
        );
        setDetails(modifiedDetails);
      } else {
        
        setError('You are neither a patient nor a doctor');
      }
    } catch (error) {
      setError(error.message);
    }
  };
function editdetails(){
  if(isdoctor){
  navigate("/doctorsignup")
  }
  else if(ispatient){
    navigate("/patientsignup")
  }
  else{
    window.alert("You are neither a patient nor a doctor")
  }
}
  const handleUpdateTreatmentStatus = async (diseases, status) => {
    try {
      await contract.updateTreatmentStatus(diseases, status);
      const patientTreatments = await contract.getTreatments();
      setTreatments(patientTreatments);
    } catch (error) {
      console.error(error);
    }
  };
const getAppointments=async()=>{
  try {
    console.log(details[0])
    const response = await axios.post('http://localhost:5000/getappointment', { patientname: details[0] }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log(response.data);
    setAppointmentdates(response.data);
  } catch (error) {
    console.error(error);
  }
  
}
  return (
    <div className="container">
    {ispatient && <PatientIcon/>}
    {isdoctor&&<DoctorIcon/>}
      <button  className='button' onClick={handleGetDetails}>Get Details</button>
      {error && <div>{error}</div>}
     
      {ispatient &&
  <div className="patient-details">
    <h1 className="patient-details__header">Patient Details</h1>
    <div className="patient-details__info">
      <h3 className="patient-details__info__item">Name: {details[0]}</h3>
      <h3 className="patient-details__info__item">Phone number: {details[1]}</h3>
      <h3 className="patient-details__info__item">Gender: {details[2]}</h3>
      <h3 className="patient-details__info__item">Date of birth: {details[3]}</h3>
      <h3 className="patient-details__info__item">Height: {details[4]}</h3>
      <h3 className="patient-details__info__item">Weight: {details[5]}</h3>
      <h3 className="patient-details__info__item">Blood Group: {details[6]}</h3>
      <h3 className="patient-details__info__item">Emergency Name: {details[7]}</h3>
      <h3 className="patient-details__info__item">Emergency Contact: {details[8]}</h3>
      <h3 className="patient-details__info__item">Emergency Contact: {details[9]}</h3>
    </div>
    <div>
    
        <h1>My Treatments</h1>
        {treatments.map((treatment, index) => (
  <div key={index} class="treatment-container">
    <h2 class="disease-heading">Diseases: {treatment.diseases}</h2>
    <p class="medication-paragraph">Medication: {treatment.medication}</p>
    <p class="status-paragraph">Status: {treatment.status ? "Cured" : "Not cured"}</p>
    <label class="status-label">
      <input
        type="checkbox"
        checked={treatment.status}
        onChange={(e) => handleUpdateTreatmentStatus(treatment.diseases, e.target.checked)}
        class="status-checkbox"
      />
      Mark as cured
    </label>
  </div>
))}
      </div>
  </div>
}

{isdoctor &&
  <div className="doctor-details">
    <h1 className="doctor-name">{details[0]}</h1>
    <div className="doctor-contact-info">
      <h3>Phone number: {details[1]}</h3>
      <h3>Gender: {details[2]}</h3>
      <h3>Date of birth: {details[3]}</h3>
    </div>
    <div className="doctor-qualification">
      <h3>Qualification: {details[4]}</h3>
      <h3>Major: {details[5]}</h3>
      <h3>Blood Group: {details[6]}</h3>
    </div>
  </div>
}

        
        
        <button className='button' onClick={editdetails}>Edit details</button>
    </div>
  );
};

export default Getdetails;
