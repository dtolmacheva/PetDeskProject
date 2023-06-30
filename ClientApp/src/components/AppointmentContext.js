import React, { useState, createContext } from "react";

export const AppointmentContext = createContext(null);

export const AppointmentContextProvider = ({
  currentAppointment,
  children,
}) => {
  const [appointment, setAppointment] = useState(currentAppointment);

  return (
    <AppointmentContext.Provider value={{ appointment, setAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
