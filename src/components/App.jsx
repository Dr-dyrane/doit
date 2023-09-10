import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Form";
import DoitItem from "./DoitItem";

function App() {
  // State to hold the list of doits
  const [doits, setDoits] = useState([]);

  // Define the base URL of your Netlify Functions
  const baseUrl = "https://doit.dr-dyrane.tech/.netlify/functions";

  // Fetch the list of doits from the backend when the component mounts
  useEffect(() => {
    // Define the function to fetch doits
    const fetchDoits = async () => {
      try {
        const response = await fetch(`${baseUrl}/getDoits`);
        if (!response.ok) {
          throw new Error("Failed to fetch doits");
        }
        const data = await response.json();
        setDoits(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoits(); // Call the function to fetch doits
  }, []);

  // Function to add a new doit
  async function addDoit(newItem) {
    if (newItem.trim() !== "") {
      const newDoit = {
        id: uuid(),
        title: newItem,
        completed: false,
      };

      try {
        const response = await fetch(`${baseUrl}/addDoit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDoit),
        });

        if (!response.ok) {
          throw new Error("Failed to add a new doit");
        }

        const data = await response.json();
        const updatedDoits = [...doits, data];
        setDoits(updatedDoits);
        localStorage.setItem("doits", JSON.stringify(updatedDoits));
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }
  }

  // Function to handle checking/unchecking a doit
  async function handleCheck(id) {
    const updatedDoits = doits.map((doit) =>
      doit.id === id ? { ...doit, completed: !doit.completed } : doit
    );

    try {
      const response = await fetch(`${baseUrl}/updateDoit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoits.find((doit) => doit.id === id)),
      });

      if (!response.ok) {
        throw new Error("Failed to update the doit");
      }

      setDoits(updatedDoits);
      localStorage.setItem("doits", JSON.stringify(updatedDoits));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  // Function to handle deleting a doit
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`${baseUrl}/deleteDoit`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Send the ID of the task to delete
        });

        if (!response.ok) {
          throw new Error("Failed to delete the doit");
        }

        const updatedDoits = doits.filter((doit) => doit.id !== id);
        setDoits(updatedDoits);
        localStorage.setItem("doits", JSON.stringify(updatedDoits));
      } catch (error) {
        console.error("Error deleting data:", error);
      }
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