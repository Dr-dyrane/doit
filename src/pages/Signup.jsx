import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			signupError: "",
			isRegistered: false,
		};
	}

	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	};

	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	};

	handleSignup = async () => {
		const { email, password } = this.state;

		try {
			this.auth = getAuth();
			createUserWithEmailAndPassword(this.auth, email, password).then(
				(userCredential) => {
					// User registered successfully
					const user = userCredential.user;
					console.log("User registered:", user);
					switch (user.role) {
						case "admin":
							// Handle registration for an admin user
							break;
						case "employee":
							// Handle registration for an employee user
							break;
						default:
							// Handle registration for other user types or scenarios
							break;
					}
					this.setState({ isRegistered: true });
				}
			);
		} catch (err) {
			// Handle signup errors
			this.setState({ signupError: err.message });
		}
	};

	render() {
		const { email, password, signupError, isRegistered  } = this.state;

		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-[#003045]">
				{/* Text Logo */}
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
						onClick={this.handleSignup}
						className="w-full bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
					>
						Register
					</button>
					{signupError && <p className="text-red-500 mt-2">{signupError}</p>}

					{/* Link back to the Login page */}
					<p className={`mt-4 text-gray-500 text-sm ${isRegistered ? 'text-green-500' : ''}`}>
					{isRegistered
							? "Account registration successful, proceed to "
							: "Already have an account? "}
						<Link to="/" className="text-purple-600 hover:underline">
							{isRegistered ? "Home" : "Login" }
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default Signup;
