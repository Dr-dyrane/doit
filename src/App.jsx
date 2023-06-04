import React, { useState } from "react";
import Form from "./Form";
import DoitItem from "./DoitItem";

function App() {
  const [doits, setDoits] = useState([]);

  function addDoit(newItem) {
    setDoits((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: newItem,
        completed: false,
      },
    ]);
  }

  function handleCheck(id) {
    setDoits((current) =>
      current.map((doit) =>
        doit.id === id ? { ...doit, completed: !doit.completed } : doit
      )
    );
  }

  function handleDelete(id) {
    setDoits((current) => current.filter((doit) => doit.id !== id));
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
