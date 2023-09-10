import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Form";
import DoitItem from "./DoitItem";

function App() {
  const [doits, setDoits] = useState([]);

  useEffect(() => {
    const storedDoits = localStorage.getItem("doits");
    if (storedDoits) {
      setDoits(JSON.parse(storedDoits));
    }
  }, []);

  function addDoit(newItem) {
    if (newItem.trim() !== "") {
      const newDoit = {
        id: uuid(),
        title: newItem,
        completed: false,
      };

      const updatedDoits = [...doits, newDoit];
      setDoits(updatedDoits);
      localStorage.setItem("doits", JSON.stringify(updatedDoits));
    }
  }

  function handleCheck(id) {
    const updatedDoits = doits.map((doit) =>
      doit.id === id ? { ...doit, completed: !doit.completed } : doit
    );
    setDoits(updatedDoits);
    localStorage.setItem("doits", JSON.stringify(updatedDoits));
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedDoits = doits.filter((doit) => doit.id !== id);
      setDoits(updatedDoits);
      localStorage.setItem("doits", JSON.stringify(updatedDoits));
    }
  }

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
