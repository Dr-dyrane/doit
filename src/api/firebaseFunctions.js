import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

class FirebaseFunctions {
  constructor() {
    this.doitsCollection = collection(db, 'doits');
  }

  // Function to fetch doits from Firestore
  async fetchDoits() {
    try {
      const querySnapshot = await getDocs(this.doitsCollection);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      throw error;
    }
  }

  // Function to add a new doit to Firestore
  async addNewDoit(newItem) {
    if (newItem.trim() !== '') {
      const newDoit = {
        title: newItem,
        completed: false,
      };

      try {
        const docRef = await addDoc(this.doitsCollection, newDoit);
        return { ...newDoit, id: docRef.id };
      } catch (error) {
        console.error('Error adding data to Firestore:', error);
        throw error;
      }
    }
  }

  // Function to update a doit in Firestore
  async updateDoit(id, updatedData) {
    try {
      const doitDoc = doc(this.doitsCollection, id);
      await updateDoc(doitDoc, updatedData);
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
      throw error;
    }
  }

  // Function to delete a doit in Firestore
  async deleteDoit(id) {
    try {
      const doitDoc = doc(this.doitsCollection, id);
      await deleteDoc(doitDoc);
    } catch (error) {
      console.error('Error deleting data in Firestore:', error);
      throw error;
    }
  }
}

export default new FirebaseFunctions();