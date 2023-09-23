import React, { Component } from "react";
import { Route, Routes, unstable_HistoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

class AppRoutes extends Component {
  render() {
    const { user } = this.props;

    return (
      <Routes>
        {user ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route
            path="/"
            element={<Login onLogin={this.handleLogin} />}
          />
        )}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  handleLogin = () => {
    // Simulate navigation to "Home" after successful login
    const history = unstable_HistoryRouter();
    history.push("/");
  };
}

export default AppRoutes;
