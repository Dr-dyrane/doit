import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const { isLoggedIn, onLogout } = this.props;

    return (
      <footer className="bg-slate-800 p-4 text-center">
        <div className="container mx-auto">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500"
            >
              Logout
            </button>
          ) : (
<img
              src="/public/doit.svg" // Replace with the path to your logo
              alt="Doit Logo"
              className="w-12 h-12 mx-auto mb-2"
            />
          )}

          <p className="mt-2 text-gray-400">
            &copy; 2023 Doit. All rights reserved. By Dyrane.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;