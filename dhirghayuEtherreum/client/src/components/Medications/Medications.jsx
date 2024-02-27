import React, { useState } from 'react';
import logo from '../Assets/logo.png';
import './medication.css';
import { ethers } from 'ethers';
import Icon from '../Doctoricon/PatientIcon';

function Medications({account,contract,provider}) {
  const [diseases, setDiseases] = useState('');
  const [medication, setMedication] = useState('');
  const [status, setStatus] = useState(false);

  async function addTreatment() {
    const treatment = {
      diseases: diseases,
      medication: medication,
      status: status
    };

    try {
      const tx = await contract.addTreatment(treatment);
      await tx.wait();
      alert('Treatment added successfully!');
      setDiseases('');
      setMedication('');
      setStatus(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  function setStatusValue(value) {
    if (value === 'Cured') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }

  return (
    <div className='medication-container'>
     
      <Icon />
      <h1 className='title'>Add Treatment</h1>
      <label className='input-box'>
        Diseases
        <input type="text" value={diseases} onChange={e => setDiseases(e.target.value)} />
      </label>
      <br />
      <label className='input-box'>
        Medication
        <input type="text" value={medication} onChange={e => setMedication(e.target.value)} />
      </label>
      <br />
      <label className='input-box'>
        Status
        <select value={status ? 'Cured' : 'Not Cured'} onChange={e => setStatusValue(e.target.value)}>
          <option value="Not Cured">Not Cured</option>
          <option value="Cured">Cured</option>
        </select>
      </label>
      <br />
      <button onClick={addTreatment} className='btn'>Add Treatment</button>
    </div>
  );
}

export default Medications
