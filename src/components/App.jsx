import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Footer from './Footer';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth'; // Import your Firebase auth instance and session persistence

import LoadingAnimation from './LoadingAnimation';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // Add loading state
      isLoggedIn: false, // Initialize as false
    };
  }

  componentDidMount() {
    // Initialize Firebase authentication and set session persistence
    this.auth = getAuth();
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        // Session persistence is set, check Firebase Authentication's login state
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            // User is logged in
            
            this.setState({ isLoggedIn: true });
          } else {
            // User is not logged in
            this.setState({ isLoggedIn: false });
          }
          this.setState({ isLoading: false });
        });

        // Check local storage for login state (if available)
        const localLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (localLoggedIn) {
          this.setState({ isLoggedIn: true });
        }
      })
      .catch((error) => {
        // Handle session persistence error
        console.error('Error setting session persistence:', error);
      });
  }

  handleLogin = () => {
    // Handle login logic and set the isLoggedIn state to true
    this.setState({ isLoggedIn: true });
    localStorage.setItem('isLoggedIn', 'true'); // Update local storage
    //console.log('User logged in.'); // Log login status
  };

  handleLogout = () => {
    this.auth = getAuth()
    signOut(this.auth)
    .then(() =>{
          // Handle logout logic and set the isLoggedIn state to false
    this.setState({ isLoggedIn: false });
    localStorage.removeItem('isLoggedIn'); // Remove from local storage
    console.log('User logged out.'); // Log logout status
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
  };

  render() {
    const { isLoading, isLoggedIn } = this.state;

    if (isLoading) {
      // Display a loading indicator while Firebase is checking authentication
      return <div><LoadingAnimation/></div>;
    }

    return (
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Render Home or Login based on isLoggedIn */}
            {isLoggedIn ? (
              <Route
                path="/"
                element={<Home onLogout={this.handleLogout} />}
              />
            ) : (
              <Route
                path="/"
                element={<Login onLogin={this.handleLogin} />}
              />
            )}
            <Route isLoggedIn={isLoggedIn} path="/signup" element={<Signup />} />
          </Routes>

          {/* Add the Footer component */}
          <Footer isLoggedIn={isLoggedIn} onLogout={this.handleLogout} />
        </div>
      </Router>
    );
  }
}

export default App;