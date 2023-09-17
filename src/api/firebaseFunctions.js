import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


class FirebaseFunctions {
	constructor() {
		// Initialize the Firestore collection to null
		this.doitsCollection = null;
		this.userId = null; // Initialize userId here

		// Add an authentication listener to ensure Firebase is initialized
		this.auth = getAuth();
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				// User is authenticated, initialize the Firestore collection
				this.userId = user.uid; // Set the userId from the authenticated user
				this.doitsCollection = collection(db, `users/${this.userId}/doits`);
			} else {
				// User is not authenticated, set the collection to null
				this.doitsCollection = null;
				this.userId = null; // Clear the userId
			}
		});
	}

	// Function to fetch doits from Firestore
	async fetchDoits() {
		try {
			if (!this.doitsCollection) {
				// Collection is not initialized, return an empty array
				return [];
			}

			const querySnapshot = await getDocs(this.doitsCollection);
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			return data;
		} catch (error) {
			console.error("Error fetching data from Firestore:", error);
			throw error;
		}
	}

	// Function to add a new doit to Firestore
	async addNewDoit(newItem) {
		if (!this.doitsCollection || newItem.trim() === "") {
			throw new Error("Invalid newItem or collection not initialized");
		}

		const newDoit = {
			title: newItem,
			completed: false,
		};

		try {
			const docRef = await addDoc(this.doitsCollection, newDoit);
			return { ...newDoit, id: docRef.id };
		} catch (error) {
			console.error("Error adding data to Firestore:", error);
			throw error;
		}
	}

	// Function to update a doit in Firestore
	async updateDoit(id, updatedData) {
		try {
			if (!this.doitsCollection) {
				// Collection is not initialized, return false to indicate failure
				return false;
			}

			const doitDoc = doc(this.doitsCollection, id);
			await updateDoc(doitDoc, updatedData);
			return true; // Return true to indicate success
		} catch (error) {
			console.error("Error updating data in Firestore:", error);
			throw error;
		}
	}

	// Function to delete a doit in Firestore
	async deleteDoit(id) {
		try {
			if (!this.doitsCollection) {
				// Collection is not initialized, return false to indicate failure
				return false;
			}

			const doitDoc = doc(this.doitsCollection, id);
			await deleteDoc(doitDoc);
			return true; // Return true to indicate success
		} catch (error) {
			console.error("Error deleting data in Firestore:", error);
			throw error;
		}
	}

	// Function to get the user-specific doits collection
	getDoitsCollection() {
		if (!this.userId) {
			throw new Error("User not authenticated");
		}
		return collection(db, `users/${this.userId}/doits`);
	}
}

export default new FirebaseFunctions();
