import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Footer from "./Footer";
import { AuthContext } from "../hooks/AuthProvider"; // Import the AuthContext from your actual file path

class App extends Component {
	render() {
		return (
			<AuthContext.Consumer>
				{(context) => (
					<Router>
						<div className="min-h-screen flex flex-col">
							<Routes>
								{/* Render Home or Login based on isLoggedIn */}
								{context.user ? (
									<Route path="/" element={<Home />} />
								) : (
									<Route path="/" element={<Login />} />
								)}
								<Route path="/signup" element={<Signup />} />
							</Routes>

							{/* Add the Footer component */}
							<Footer
								isLoggedIn={context.user !== null}
								onLogout={context.handleLogout}
							/>
						</div>
					</Router>
				)}
			</AuthContext.Consumer>
		);
	}
}

export default App;
