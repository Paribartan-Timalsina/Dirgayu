import React, { useEffect, useState } from 'react';
import axios from "axios"
import { BigNumber } from 'bignumber.js';
import { useNavigate } from "react-router-dom";
import PatientIcon from "../Doctoricon/PatientIcon"
import DoctorIcon from "../Doctoricon/DoctorIcon"
import './Appointments.css'

const Appointments = ({ account, contract, provider }) => {
  const navigate = useNavigate();
  const [appointmentdates, setAppointmentdates] = useState([])
  const [ispatient, setaspatient] = useState()
  const [isdoctor, setasdoctor] = useState()
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');
  const [treatments, setTreatments] = useState([]);
  const [patientname,setPatientname]=useState('')
  const [doctorname,setDoctorname]=useState()
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);
  useEffect(() => {
    //handleGetDetails();
  }, [])
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
        const name= await contract.getPatientDetails()
        console.log(name[0])
        setPatientname(name[0])
        try {
          const response = await axios.post('http://localhost:5000/getappointment', { patientname:name[0] }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
    
          console.log(response.data);
          setAppointmentdates(response.data);
          setAppointmentsLoaded(true);
        } catch (error) {
          console.error(error);
        }
      } else if (isDoctor) {
        const name= await contract.getDoctorName()
        setDoctorname(name)
      } else {
        setError('You are neither a patient nor a doctor');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelAppointment = async (appointmentDay) => {
    console.log(appointmentDay)
    try {
      const response = await axios.post('http://localhost:5000/deleteappointment', {
        appointmentDay,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      //console.log(response.data);
      // setAppointmentdates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAppointments = async () => {
    try {
      const response = await axios.post('http://localhost:5000/getappointment', { patientname:patientname }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log(response.data);
      setAppointmentdates(response.data);
      setAppointmentsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="container">
      <PatientIcon />
      <h2>My Appointments</h2>
      {ispatient && appointmentsLoaded ? (
        <div className="appointment-dates">
          {appointmentdates.map(dates => (
            <div className="appointment-date">
              <h4 className="doctor-name">Doctor name: {dates.doctname}</h4>
              <h4 className="appointment-day">Appointment Day: {dates.appointmentday}</h4>
              <button className="cancel-appointment-btn" onClick={() => cancelAppointment(dates.appointmentday)}>Cancel this appointment</button>
            </div>
          ))}
        </div>
      ) : (
        <button onClick={handleGetDetails}>See Appointments</button>
      )}
    </div>
  );
};

export default Appointments;
