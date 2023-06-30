import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";

import AppointmentRow from "./AppointmentRow";
import { AppointmentContextProvider } from "./AppointmentContext";
import { fetchAppointments } from "../api/ApiClient";

import "react-dropdown/style.css";
import "./Appointments.css";

const searchKeyOptions = ["appointmentType", "vetDataId", "userName"];

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState(searchKeyOptions[0]);
  const [sortDateName, setSortDateName] = useState("createDateTime");

  useEffect(() => {
    fetchAppointments()
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("could not fetch appointments");
      });
  }, []);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const searchMatchedKey = (apt) => {
    switch (searchKey) {
      case "userName":
        return `${apt.user.firstName} ${apt.user.lastName}`
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      case "vetDataId":
        return apt.user.vetDataId
          .toLowerCase()
          .startsWith(searchInput.toLowerCase());
      default:
        return apt[searchKey].toLowerCase().includes(searchInput.toLowerCase());
    }
  };

  return (
    <div className="appointment-theme">
      <div className="appointment-search-sort">
        <div className="appointment-search">
          <div>Search by</div>
          <Dropdown
            options={searchKeyOptions}
            value={searchKeyOptions[0]}
            onChange={(sk) => setSearchKey(sk.value)}
            placeholder="Select an option"
          />
          <input type="text" onChange={(e) => handleSearchInputChange(e)} />
        </div>
        <div className="appointment-sort">
          <button onClick={() => setSortDateName("requestedDateTimeOffset")}>
            Sort by appointment date
          </button>
          <button onClick={() => setSortDateName("createDateTime")}>
            Sort by date created
          </button>
        </div>
      </div>
      <div className="appointments-container">
        {appointments !== null ? (
          appointments
            .filter((apt) => {
              if (searchInput === "") {
                return apt;
              } else if (searchMatchedKey(apt)) {
                return apt;
              }
            })
            .sort(
              (a, b) =>
                new Date(...a[sortDateName].split("/").reverse()) -
                new Date(...b[sortDateName].split("/").reverse())
            )
            .map((apt) => (
              <AppointmentContextProvider
                currentAppointment={apt}
                key={apt.appointmentId}
              >
                <AppointmentRow />
              </AppointmentContextProvider>
            ))
        ) : (
          <div>No appointments found</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
