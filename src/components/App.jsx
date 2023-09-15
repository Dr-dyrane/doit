import React, { Component } from 'react';
import Form from './Form';
import DoitItem from './DoitItem';
import FirebaseFunctions from '../api/firebaseFunctions'; // Import the FirebaseFunctions class instance

class App extends Component {
  constructor() {
    super();
    this.state = {
      doits: [],
    };
  }

  componentDidMount() {
    // Fetch doits from Firestore when the component mounts
    this.fetchDoits();
  }

  async fetchDoits() {
    try {
      // Fetch doits from Firestore using FirebaseFunctions.fetchDoits method
      const data = await FirebaseFunctions.fetchDoits();
      this.setState({ doits: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async addDoit(newItem) {
    try {
      // Add a new doit to Firestore using FirebaseFunctions.addNewDoit method
      const newDoit = await FirebaseFunctions.addNewDoit(newItem);
      const updatedDoits = [...this.state.doits, newDoit];
      
      // Update the state
      this.setState({ doits: updatedDoits });
      
      // Update local storage
      localStorage.setItem('doits', JSON.stringify(updatedDoits));
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  async handleCheck(id) {
    const updatedDoits = this.state.doits.map((doit) =>
      doit.id === id ? { ...doit, completed: !doit.completed } : doit
    );
  
    try {
      // Update a doit in Firestore using FirebaseFunctions.updateDoit method
      await FirebaseFunctions.updateDoit(id, {
        completed: updatedDoits.find((doit) => doit.id === id).completed,
      });
  
      // Update the state
      this.setState({ doits: updatedDoits });
  
      // Update local storage
      localStorage.setItem('doits', JSON.stringify(updatedDoits));
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Delete a doit from Firestore using FirebaseFunctions.deleteDoit method
        await FirebaseFunctions.deleteDoit(id);
        const updatedDoits = this.state.doits.filter((doit) => doit.id !== id);
        
        // Update the state
        this.setState({ doits: updatedDoits });
        
        // Update local storage
        localStorage.setItem('doits', JSON.stringify(updatedDoits));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  }

  render() {
    const { doits } = this.state;

    return (
      <div className="flex flex-col items-start font-semibold p-4 h-screen bg-[#003045]">
        {/* Render the Form component for adding new doits */}
        <Form addDoit={(newItem) => this.addDoit(newItem)} />

        <div className="w-full">
          <h1 className="text-yellow-500 text-2xl mt-4">Do-it List</h1>
          {doits.length === 0 ? (
            <p className="text-white mt-2">No doits to display</p>
          ) : (
            <ul className="mt-2">
              {/* Map and render the list of doits using the DoitItem component */}
              {doits.map((doit) => (
                <DoitItem
                  key={doit.id}
                  doit={doit}
                  handleCheck={(id) => this.handleCheck(id)}
                  handleDelete={(id) => this.handleDelete(id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;