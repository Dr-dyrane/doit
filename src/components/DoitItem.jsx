import React from "react";

function DoitItem({ doit, handleCheck, handleDelete }) {
  return (
    <li className="flex items-center mb-2 justify-between">
      <label className="flex items-center text-white">
        <input
          type="checkbox"
          checked={doit.completed}
          onChange={() => handleCheck(doit.id)}
          className="rounded appearance-none h-4 w-4 border border-gray-300 checked:bg-yellow-500 checked:border-transparent"
        />
        <span
          className={`ml-2 ${doit.completed ? "line-through text-white" : ""}`}
        >
          {doit.title}
        </span>
      </label>
      <button
        type="button"
        onClick={() => handleDelete(doit.id)}
        className="bg-transparent border border-red-500 text-red-500 hover:bg-red-700 hover:text-white px-4 py-2 rounded-lg"
      >
        Delete
      </button>
    </li>
  );
}

export default DoitItem;
