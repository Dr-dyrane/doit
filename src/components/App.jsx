// ./src/components/App.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Form from './Form';
import DoitItem from './DoitItem';
import { db } from '../../firebase'; // Import the Firebase instance
import { getDocs, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions

function App() {
  const [doits, setDoits] = useState([]);

  // Function to fetch doits from Firestore when the component mounts
  useEffect(() => {
    const fetchDoits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doits'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoits(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDoits();
  }, []);

  // Function to add a new doit to Firestore
  async function addDoit(newItem) {
    if (newItem.trim() !== '') {
      const newDoit = {
        title: newItem,
        completed: false,
      };

      try {
        const docRef = await addDoc(collection(db, 'doits'), newDoit);
        const updatedDoits = [...doits, { ...newDoit, id: docRef.id }];
        setDoits(updatedDoits);
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  }

  // Function to handle checking/unchecking a doit in Firestore
  async function handleCheck(id) {
    const updatedDoits = doits.map((doit) =>
      doit.id === id ? { ...doit, completed: !doit.completed } : doit
    );

    try {
      await updateDoc(doc(db, 'doits', id), {
        completed: updatedDoits.find((doit) => doit.id === id).completed,
      });
      setDoits(updatedDoits);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Function to handle deleting a doit in Firestore
  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteDoc(doc(db, 'doits', id));
        const updatedDoits = doits.filter((doit) => doit.id !== id);
        setDoits(updatedDoits);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
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
