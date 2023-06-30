import React, { useState, useContext } from "react";
import { AppointmentContext } from "./AppointmentContext";
import { Spinner } from "reactstrap";
import { FaCheck } from "react-icons/fa";
import { confirmAppointmentRequest } from "../api/ApiClient";

function ConfirmAppointmentButton() {
  const { appointment, setAppointment } = useContext(AppointmentContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmClick = () => {
    setIsLoading(true);

    confirmAppointmentRequest(appointment.appointmentId)
      .then((data) => {
        if (data === undefined || data === null) {
          window.alert("Could not confirm the appointment");
          return;
        }

        setAppointment(data);
        console.log(`appointment ${appointment.appointmentId} confirmed`);
      })
      .catch((err) => {
        console.error(err);
        window.alert("Could not confirm the appointment");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isConfirmed = appointment.isConfirmed ?? false;

  return isConfirmed ? (
    <div>
      Confirmed <FaCheck />
    </div>
  ) : (
    <button disabled={isLoading} onClick={() => handleConfirmClick()}>
      {isLoading ? <Spinner /> : <>Confirm</>}
    </button>
  );
}

export default ConfirmAppointmentButton;
