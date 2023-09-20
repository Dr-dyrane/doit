import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider"; // Import the AuthContext from your actual file path

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <AuthContext.Consumer>
        {(context) => (
          <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Doit</h1>
            <div className="bg-slate-200 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Sign Up for Doit</h2>
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
                onClick={() => context.handleSignup(email, password)} // Use the handleSignup function from the context
                className="w-full bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                Register
              </button>
              {context.error && (
                <p className="text-red-500 mt-2">{context.error}</p>
              )}
              <p
                className={`mt-4 text-gray-500 text-sm ${
                  context.isRegistered ? "text-green-500" : ""
                }`}
              >
                {context.isRegistered
                  ? "Account registration successful, proceed to "
                  : "Already have an account? "}
                <Link to="/" className="text-purple-600 hover:underline">
                  {context.isRegistered ? "Home" : "Login"}
                </Link>
              </p>
            </div>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Signup;
