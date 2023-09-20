import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import "./assets/index.css";

const rootElement = document.getElementById("root");

// Create a root using createRoot
if (!rootElement._reactRootContainer) {
	const root = ReactDOM.createRoot(rootElement);

	function Main() {
		return (
			<React.StrictMode>
				<AuthProvider>
					<App />
				</AuthProvider>
			</React.StrictMode>
		);
	}

	// Use .render() on the root to render the Main component
	root.render(<Main />);
}
