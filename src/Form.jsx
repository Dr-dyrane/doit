import React, { useState } from "react";

function Form({ addDoit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() !== "") {
      addDoit(newItem);
      setNewItem("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center justify-between">
        <input
          type="text"
          id="item"
          placeholder="add a task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 rounded-l-lg dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-transparent inline-flex border border-purple-500 text-purple-500 px-4 py-2 rounded-r-lg hover:bg-purple-500 hover:text-white transition-colors duration-300"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;
