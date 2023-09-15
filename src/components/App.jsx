import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    };
  }

  handleLogin = () => {
    // Handle login logic and set the isLoggedIn state to true
    this.setState({ isLoggedIn: true });
    localStorage.setItem('isLoggedIn', 'true');
    console.log('User logged in.'); // Log login status
  };

  handleLogout = () => {
    // Handle logout logic and set the isLoggedIn state to false
    this.setState({ isLoggedIn: false });
    localStorage.removeItem('isLoggedIn');
    console.log('User logged out.'); // Log logout status
  };

  render() {
    const { isLoggedIn } = this.state;

    console.log('Current login status:', isLoggedIn); // Log current login status

    return (
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Render Home or Login based on isLoggedIn */}
            {isLoggedIn ? (
              <Route path="/" element={<Home onLogout={this.handleLogout} />} />
            ) : (
              <Route path="/" element={<Login onLogin={this.handleLogin} />} />
            )}
          </Routes>

          {/* Add the Footer component */}
          <Footer isLoggedIn={isLoggedIn} onLogout={this.handleLogout} />
        </div>
      </Router>
    );
  }
}

export default App;