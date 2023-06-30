import React, { useContext } from "react";
import ConfirmAppointmentButton from "./ConfirmAppointmentButton";
import SuggestAppointmentDate from "./SuggestAppointmentDate";
import AppointmentContext from "./AppointmentContext";

function AppointmentExpandedRow() {
  const { appointment } = useContext(AppointmentContext);

  const aptDate = new Date(
    appointment.requestedDateTimeOffset
  ).toLocaleString();
  const { userId, firstName, lastName, vetDataId } = appointment.user;
  const { animalId, firstName: petName, species, breed } = appointment.animal;

  return (
    <div className="appointment-expanded-row">
      <div className="appointment-expanded-details">
        <div>
          <div>
            Appointment (ID:{appointment.appointmentId}):{" "}
            {appointment.appointmentType}
          </div>
          <div>Created on: {appointment.createDateTime}</div>
        </div>
        <div>
          <div>
            Customer (ID:{userId}): {firstName} {lastName}
          </div>
          <div>(Associated VetDataId: {vetDataId})</div>
        </div>
        <div>
          <div>
            Pet name(ID:{animalId}): {petName}
          </div>
          <div>Species: {species ? species : "--"}</div>
          <div>Breed: {breed ? breed : "--"}</div>
        </div>
      </div>
      <div
        className="appointment-expanded-actions"
        onClick={(e) => e.stopPropagation()}
      >
        <SuggestAppointmentDate />
        <ConfirmAppointmentButton />
      </div>
    </div>
  );
}

export default AppointmentExpandedRow;
