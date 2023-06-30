import React, { useContext, useState } from "react";
import AppointmentExpandedRow from "./AppointmentExpandedRow";
import ConfirmAppointmentButton from "./ConfirmAppointmentButton";
import SuggestAppointmentDate from "./SuggestAppointmentDate";
import AppointmentContext from "./AppointmentContext";

function AppointmentRow() {
  const [expanded, setExpanded] = useState(false);
  const { appointment } = useContext(AppointmentContext);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={() => toggleExpanded()} className="appointment-row">
      {expanded ? (
        <AppointmentExpandedRow className="appointment-expanded-view" />
      ) : (
        <>
          <div className="appointment-details">
            <h5>{appointment.appointmentType}</h5>
            <div>
              User (ID:{appointment.user.userId}): {appointment.user.firstName}{" "}
              {appointment.user.lastName}
            </div>
            <div>
              Pet (ID: {appointment.animal.animalId}):{" "}
              {appointment.animal.firstName}
            </div>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="appointment-actions"
          >
            <SuggestAppointmentDate />
            <ConfirmAppointmentButton />
          </div>
        </>
      )}
    </div>
  );
}

export default AppointmentRow;
