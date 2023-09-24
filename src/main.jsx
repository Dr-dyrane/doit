import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import "./assets/index.css";

const rootElement = document.getElementById("root");

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Service Worker registered with scope:", registration.scope);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
}

// Register the service worker when the page loads
window.addEventListener("load", registerServiceWorker);

// Create a root using ReactDOM.createRoot
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
