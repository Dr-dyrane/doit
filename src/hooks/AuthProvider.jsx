import React, { Component, createContext } from "react";
import {
	getAuth,
	onAuthStateChanged,
	setPersistence,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import LoadingAnimation from "../components/LoadingAnimation";
import Modal from "react-modal"; // Import react-modal

const AuthContext = createContext({});

class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			error: null,
			loadingInitial: true,
			loading: false,
			isRegistered: false,
			isOnline: navigator.onLine,
			isOfflineModalOpen: false, // State for showing the offline modal
			isLogged: false, // New state to track user's logged-in status
		};
		this.auth = getAuth(); // Initialize Firebase auth instance
	}

	componentDidMount() {
		// Set session persistence
		setPersistence(this.auth, browserSessionPersistence)
			.then(() => {
				// Check Firebase Authentication's login state
				onAuthStateChanged(this.auth, (user) => {
					if (user) {
						// User is logged in
						this.setState({ user, isLogged: true });
						localStorage.setItem("isLoggedIn", "true"); // Backup user status to local storage
					} else {
						// User is not logged in
						this.setState({ user: null, isLogged: false });
						localStorage.removeItem("isLoggedIn"); // Clear user status from local storage
					}
					this.setState({ loadingInitial: false });
				});

				// Check local storage for login state (if available)
				const localLoggedIn = localStorage.getItem("isLoggedIn") === "true";
				if (localLoggedIn) {
					this.setState({ user: true, isLogged: true });
				}
			})
			.catch((error) => {
				// Handle session persistence error
				console.error("Error setting session persistence:", error);
			});
		// Detect online/offline status changes
		window.addEventListener("online", this.handleOnline);
		window.addEventListener("offline", this.handleOffline);
	}

	componentWillUnmount() {
		// Remove event listeners when the component unmounts
		window.removeEventListener("online", this.handleOnline);
		window.removeEventListener("offline", this.handleOffline);
	}

	handleOnline = () => {
		// Implement logic for when the app reconnects to the internet
		// This could include automatic login, syncing data, etc.
		this.setState({ isOnline: true });
	};

	handleOffline = () => {
		// Implement logic for when the app goes offline
		// You can update the state to indicate offline status here
		this.setState({ isOnline: false, isOfflineModalOpen: true });
	};

	handleCloseOfflineModal = () => {
		// Close the offline modal
		this.setState({ isOfflineModalOpen: false });
	};

	handleLogin = async (email, password) => {
		if (!this.isValidEmail(email)) {
			this.setState({ error: "Invalid email address" });
			return;
		}

		try {
			this.setState({ loading: true });
			const userCredential = await signInWithEmailAndPassword(
				this.auth,
				email,
				password
			);
			// User logged in successfully
			const user = userCredential.user;
			console.log("User logged in:", user);
		} catch (error) {
			// Handle login errors
			console.error("Error during login:", error.code, error.message);
			this.setState({ error: error.message });
		} finally {
			this.setState({ loading: false });
		}
	};

	handleGoogleLogin = async () => {
		try {
			this.setState({ loading: true });
			const provider = new GoogleAuthProvider();
			await setPersistence(this.auth, browserSessionPersistence);
			const userCredential = await signInWithPopup(this.auth, provider);
			const user = userCredential.user;
			this.setState({ user, error: null });
		} catch (error) {
			console.error("Error during Google login:", error);
			this.setState({ error: error.message });
		} finally {
			this.setState({ loading: false });
		}
	};

	handleLogout = async () => {
		this.setState({ loading: true });
		try {
			await signOut(this.auth);
			// Handle logout logic and set the user state to null
			this.setState({ user: null });
			localStorage.removeItem("isLoggedIn"); // Remove from local storage
			console.log("User logged out."); // Log logout status
		} catch (error) {
			// Handle logout errors
			console.error("Error during logout:", error);
		} finally {
			this.setState({ loading: false });
		}
	};

	isValidEmail = (email) => {
		// Use a regular expression to validate the email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	handleSignup = async (email, password) => {
		if (!this.isValidEmail(email)) {
			this.setState({ error: "Invalid email address" });
			return;
		}

		try {
			this.setState({ loading: true });
			const userCredential = await createUserWithEmailAndPassword(
				this.auth,
				email,
				password
			);
			// User registered successfully
			const user = userCredential.user;
			console.log("User registered:", user);
			this.setState({ isRegistered: true }); // Set isRegistered to true on successful registration
		} catch (error) {
			// Handle signup errors
			console.error("Error during signup:", error.code, error.message);
			this.setState({ error: error.message });
		} finally {
			this.setState({ loading: false });
		}
	};

	render() {
		const {
			user,
			error,
			loadingInitial,
			loading,
			isRegistered,
			isOnline,
			isOfflineModalOpen,
			e,
		} = this.state;
		const { children } = this.props;
		const isLogged = localStorage.getItem("isLoggedIn") === "true";

		const contextValue = {
			loading,
			user,
			isLogged, // Include isLogged in the context value
			error,
			isRegistered,
			handleLogin: this.handleLogin,
			handleLogout: this.handleLogout,
			handleGoogleLogin: this.handleGoogleLogin,
		};

		if (loadingInitial) {
			// Display a loading indicator while Firebase is checking authentication
			return <LoadingAnimation />;
		}

		return (
			<AuthContext.Provider value={contextValue}>
				{children}
				{/* Show the offline modal when offline */}
				<Modal
					isOpen={isOfflineModalOpen}
					onRequestClose={this.handleCloseOfflineModal}
				>
					<div className="flex bg-slate-300 items-center justify-between">
						<p>You are currently offline. Some features may be limited.</p>
						<button className ="w-full p-2 m-2 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-700" onClick={this.handleCloseOfflineModal}>Close</button>
					</div>
				</Modal>
			</AuthContext.Provider>
		);
	}
}

export { AuthProvider, AuthContext };
