import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Import your custom CSS

function ProfessionalCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 31536000000)} // one year from now
        calendarType="ISO 8601"
      />
    </div>
  );
}

export default ProfessionalCalendar;
