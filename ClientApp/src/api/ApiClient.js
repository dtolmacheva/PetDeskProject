import React from "react";

export const fetchAppointments = async () => {
  const response = await fetch("appointment");
  console.log({ response });
  return await response.json();
};

export const confirmAppointmentRequest = (id) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`appointment/confirm/${id}`, requestOptions).then((response) =>
    response.json()
  );
};

export const updateAppointmentDateRequest = (id, suggestedDate) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(suggestedDate.toISOString()),
  };

  return fetch(`appointment/${id}`, requestOptions).then((response) =>
    response.json()
  );
};
