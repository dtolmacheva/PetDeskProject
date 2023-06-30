import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import { Layout } from "./components/Layout";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }
}
