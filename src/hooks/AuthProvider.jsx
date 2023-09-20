import React, { Component, createContext } from "react";
import {
	getAuth,
	onAuthStateChanged,
	setPersistence,
	browserSessionPersistence,
    createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import LoadingAnimation from "../components/LoadingAnimation";

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
						this.setState({ user });
					} else {
						// User is not logged in
						this.setState({ user: null });
					}
					this.setState({ loadingInitial: false });
				});

				// Check local storage for login state (if available)
				const localLoggedIn = localStorage.getItem("isLoggedIn") === "true";
				if (localLoggedIn) {
					this.setState({ user: true });
				}
			})
			.catch((error) => {
				// Handle session persistence error
				console.error("Error setting session persistence:", error);
			});
	}

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
			console.error("Error during login:", error.code, error.message);
			this.setState({ error: error.message });
		} catch (error) {
			// Handle login errors
			this.setState({ error });
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
		const { user, error, loadingInitial, loading, isRegistered } = this.state;
		const { children } = this.props;

		const contextValue = {
			loading,
			user,
			error,
            isRegistered,
			handleLogin: this.handleLogin,
			handleLogout: this.handleLogout,
			handleSignup: this.handleSignup,
		};

		if (loadingInitial) {
			// Display a loading indicator while Firebase is checking authentication
			return <LoadingAnimation />;
		}

		return (
			<AuthContext.Provider value={contextValue}>
				{children}
			</AuthContext.Provider>
		);
	}
}

export { AuthProvider, AuthContext };
