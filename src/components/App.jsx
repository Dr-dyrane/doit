import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Form";
import DoitItem from "./DoitItem";

function App() {
  // State to hold the list of doits
  const [doits, setDoits] = useState([]);
  
  // Define the base URL of your backend API
  const backendUrl = "https://doit-backend.vercel.app/"//"http://localhost:3001/api/doits"; // Replace with your backend API URL

  // Fetch the list of doits from the backend when the component mounts
  useEffect(() => {
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => setDoits(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to add a new doit
  function addDoit(newItem) {
    if (newItem.trim() !== "") {
      const newDoit = {
        id: uuid(),
        title: newItem,
        completed: false,
      };

      // Send a POST request to add the new doit to the backend
      fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoit),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedDoits = [...doits, data];
          setDoits(updatedDoits);
          localStorage.setItem("doits", JSON.stringify(updatedDoits));
        })
        .catch((error) => console.error("Error adding data:", error));
    }
  }

  // Function to handle checking/unchecking a doit
  function handleCheck(id) {
    const updatedDoits = doits.map((doit) =>
      doit.id === id ? { ...doit, completed: !doit.completed } : doit
    );

    // Send a PUT request to update the status of the selected doit on the backend
    fetch(`${backendUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDoits.find((doit) => doit.id === id)),
    })
      .then((response) => response.json())
      .then(() => {
        setDoits(updatedDoits);
        localStorage.setItem("doits", JSON.stringify(updatedDoits));
      })
      .catch((error) => console.error("Error updating data:", error));
  }

  // Function to handle deleting a doit
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      // Send a DELETE request to remove the selected doit from the backend
      fetch(`${backendUrl}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedDoits = doits.filter((doit) => doit.id !== id);
          setDoits(updatedDoits);
          localStorage.setItem("doits", JSON.stringify(updatedDoits));
        })
        .catch((error) => console.error("Error deleting data:", error));
    }
  }

  // Render the list of doits and the form to add new doits
  return (
    <div className="flex flex-col items-start font-semibold p-4 h-screen bg-[#003045]">
      <Form addDoit={addDoit} />
      <div className="w-full">
        <h1 className="text-yellow-500 text-2xl mt-4">Do-it List</h1>
        {doits.length === 0 ? (
          <p className="text-white mt-2">No doits to display</p>
        ) : (
          <ul className="mt-2">
            {doits.map((doit) => (
              <DoitItem
                key={doit.id}
                doit={doit}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;