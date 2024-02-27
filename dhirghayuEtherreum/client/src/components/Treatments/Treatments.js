import React, { useEffect, useState } from 'react';
import axios from "axios"
import './treatment.css';
import { BigNumber } from 'bignumber.js';
import { useNavigate } from "react-router-dom";
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

      if (ispatient) {
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
      } else if (isdoctor) {
        
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


  return (
    <div className='box4'>
      <button onClick={handleGetDetails}>Get Details</button>
      {/* {error && <div>{error}</div>} */}
     
        {ispatient &&
        <>
        
         <div>
        <h1>My Treatments</h1>
        {treatments.map((treatment, index) => (
          <div key={index}>
            <h2>Diseases: {treatment.diseases}</h2>
            <p>Medication: {treatment.medication}</p>
            <p>Status: {treatment.status ? "Cured" : "Not cured"}</p>
            <label>
              <input
                type="checkbox"
                checked={treatment.status}
                onChange={(e) => handleUpdateTreatmentStatus(treatment.diseases, e.target.checked)}
              />
              Mark as cured
            </label>
          </div>
        ))}
      </div>
         
         </>
        }  
        <button onClick={editdetails}>Edit details</button>
    </div>
  );
};

export default Getdetails;
