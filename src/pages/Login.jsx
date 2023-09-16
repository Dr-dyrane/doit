import React, { Component } from "react";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			loginError: "",
		};
	}

	handleUsernameChange = (e) => {
		this.setState({ username: e.target.value });
	};

	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	};

	handleLogin = () => {
		const { username, password } = this.state;

		// Simplified login logic with a switch statement
		switch (username) {
			case "user":
				if (password === "password") {
					// Call the onLogin function to set isLoggedIn to true
					this.props.onLogin();
				} else {
					this.setState({ loginError: "Incorrect password" });
				}
				break;
			default:
				this.setState({ loginError: "Invalid username" });
				break;
		}
	};

	render() {
		const { username, password, loginError } = this.state;

		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-[#003045]">
				{/* Text Logo */}
				<h1 className="text-4xl font-bold text-purple-600 mb-4">
					Doit<sup className="m-1 text-2xl text-purple-600">&#174;</sup>
				</h1>
				<div className="bg-slate-200 p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold mb-4">Login to doit</h2>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={this.handleUsernameChange}
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
				</div>
			</div>
		);
	}
}

export default Login;
