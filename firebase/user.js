import { db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {initializeUserUnlockedWords, initializeUserWords} from "./seeder";

// this function creates a user document in the 'users' collection
export const createUser = async (userId, username) => {
    try {
        // define the user data structure
        const userData = {
            username
        };

        // run the user seeders
        await initializeUserWords(userId);
        await initializeUserUnlockedWords(userId);

        // create a document reference for the user
        const userRef = doc(db, 'users', userId);

        // set the user document with the defined structure
        await setDoc(userRef, userData);

        console.log(`User ${userId} created successfully.`);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const exists = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
        return docSnap.exists();
    } catch (error) {
        console.error('Error checking if user exists:', error);
    }
};

export const getUsername = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
        return docSnap.data().username;
    } catch (error) {
        console.error('Error getting username:', error);
    }
}