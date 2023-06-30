import React, { useState, useContext } from "react";
import DateTimePicker from "react-datetime-picker";
import { Spinner } from "reactstrap";

import { AppointmentContext } from "./AppointmentContext";
import { updateAppointmentDateRequest } from "../api/ApiClient";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function SuggestAppointmentDate() {
  const appointmentContext = useContext(AppointmentContext);
  const appointment = appointmentContext.appointment;
  const [suggestedDate, setSuggestedDate] = useState(
    new Date(appointment.requestedDateTimeOffset)
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateDateClick = () => {
    setIsLoading(true);
    updateAppointmentDateRequest(appointment.appointmentId, suggestedDate)
      .then((data) => {
        if (data === undefined || data === null) {
          window.alert("Could not change the date of appointment");
          return;
        }
        appointmentContext.setAppointment(data);
        window.alert("Appointment date updated");
        console.log(`appointment ${appointment.appointmentId} date changed`);
      })
      .catch((err) => {
        console.error(err);
        window.alert("Could not change the date of appointment");
        setSuggestedDate(new Date(appointment.requestedDateTimeOffset));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="appointment-actions-input">
        <div>Appointment Date </div>
        <DateTimePicker
          onChange={(dateTime) => setSuggestedDate(dateTime)}
          value={suggestedDate}
          disableClock={true}

          // if all appointments in dashboard are in the future then it would be useful to set the minDate as well
          //minDate={new Date()}
        />
      </div>
      <button disabled={isLoading} onClick={() => handleUpdateDateClick()}>
        {isLoading ? <Spinner /> : <>Update Appointment Date</>}
      </button>
    </>
  );
}

export default SuggestAppointmentDate;
