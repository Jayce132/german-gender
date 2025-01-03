import { db } from './config';
import { doc, setDoc } from 'firebase/firestore';

// this function creates a user document in the 'users' collection
const createUser = async (userId) => {
    try {
        // define the user data structure
        const userData = {
            words: [],
            unlockedWords: []
        };

        // create a document reference for the user
        const userRef = doc(db, 'users', userId);

        // set the user document with the defined structure
        await setDoc(userRef, userData);

        console.log(`User ${userId} created successfully.`);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export { createUser };