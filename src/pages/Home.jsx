import React, { Component } from "react";
import Form from "../components/Form";
import DoitItem from "../components/DoitItem";
import FirebaseFunctions from "../api/firebaseFunctions"; // Import the FirebaseFunctions class instance
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import your Firebase auth instance
import UserProfile from "../components/UserProfie";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			doits: [],
		};
	}

	componentDidMount() {
		// Add an authentication listener to ensure Firebase is initialized
		this.auth = getAuth();
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				// User is authenticated, fetch doits from Firestore
				this.initializeDoitsCollection(user);
			}
		});
	}

	async initializeDoitsCollection(user) {
		try {
			// Use the user's UID to create a collection specific to that user
			const doitsCollection = FirebaseFunctions.getDoitsCollection(user.uid);
			if (doitsCollection) {
				const data = await FirebaseFunctions.fetchDoits(doitsCollection);
				this.setState({ doits: data });
			} else {
				console.error("Firestore collection not initialized.");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	async addDoit(newItem) {
		try {
			// Add a new doit to Firestore using FirebaseFunctions.addNewDoit method
			if (!newItem.trim()) {
				console.error("Invalid newItem.");
				return;
			}
			const newDoit = await FirebaseFunctions.addNewDoit(newItem);
			if (newDoit) {
				const updatedDoits = [...this.state.doits, newDoit];

				console.log("New item:", newItem); // Log the new item being added
				console.log("New Doit:", newDoit); // Log the new Doi t data

				// Update the state
				this.setState({ doits: updatedDoits });
				// Update local storage
				localStorage.setItem("doits", JSON.stringify(updatedDoits));
			} else {
				console.error("Failed to add new item to Firestore.");
			}
		} catch (error) {
			console.error("Error adding data:", error);
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
			localStorage.setItem("doits", JSON.stringify(updatedDoits));
		} catch (error) {
			console.error("Error updating data:", error);
		}
	}

	async handleDelete(id) {
		if (window.confirm("Are you sure you want to delete this task?")) {
			try {
				// Delete a doit from Firestore using FirebaseFunctions.deleteDoit method
				await FirebaseFunctions.deleteDoit(id);
				const updatedDoits = this.state.doits.filter((doit) => doit.id !== id);

				// Update the state
				this.setState({ doits: updatedDoits });

				// Update local storage
				localStorage.setItem("doits", JSON.stringify(updatedDoits));
			} catch (error) {
				console.error("Error deleting data:", error);
			}
		}
	}

	render() {
		const { doits } = this.state;

		return (
			<div className="flex flex-col items-center justify-between font-semibold p-4 h-screen bg-slate-300">
				<div className="w-full h-[86%] text-center">
					<div className="h-[22%] bg-slate-300 ">
						<h1 className="text-purple-700 mt-16 font-bold text-4xl">My doits</h1>
						<p className="text-purple-500 mt-2 mb-10">  {doits.length === 0
            ? "doit"
            : `${doits.filter((doit) => !doit.completed).length} ${
                  doits.filter((doit) => !doit.completed).length === 1 ? "doit" : "doits"
              } left to do`}</p>
            <div><UserProfile/></div>
					</div>
					{doits.length === 0 ? (
						<p className="text-black mt-2">No doits to display</p>
					) : (
						<ul className="mt-2 overflow-auto h-[60%]">
							{/* Map and render the list of doits using the DoitItem component */}
							{doits.map((doit) =>
								doit && doit.id ? (
									<DoitItem
										key={doit.id}
										doit={doit}
										handleCheck={(id) => this.handleCheck(id)}
										handleDelete={(id) => this.handleDelete(id)}
									/>
								) : null
							)}
						</ul>
					)}
				</div>
				<div className="flex-shrink-0 h-[14%] shadow-t-md rounded-lg w-full bg-slate-300">
					{/* Render the Form component for adding new doits */}
					<Form addDoit={(newItem) => this.addDoit(newItem)} />
				</div>
			</div>
		);
	}
}

export default Home;
