import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: '',
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    if (!this.isValidEmail(email)) {
      this.setState({ loginError: 'Invalid email address' });
      return;
    }

    try {
      this.auth = getAuth();
      signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log('User logged in:', user);
      });
    } catch (err) {
      // Handle login errors
      this.setState({ loginError: err.message });
    }
  };

  isValidEmail = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  render() {
    const { email, password, loginError } = this.state;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003045]">
        {/* Text Logo */}
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Doit</h1>
        <div className="bg-slate-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Login to Doit</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.handleEmailChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
          />
          <button
            onClick={this.handleLogin}
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
          >
            Login
          </button>
          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}

          {/* Link to Sign Up page with pre-filled data */}
          <p className="mt-4 text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link
              to={{
                pathname: '/signup',
                state: { email, password }, // Pass the email and password as state
              }}
              className="text-purple-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;