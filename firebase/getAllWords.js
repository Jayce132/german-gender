import {collection, getDocs, query, orderBy, doc, getDoc} from 'firebase/firestore';
import { db } from './config';

/**
 * Fetches all words from the Firestore 'words' collection and groups them by type.
 * The words are ordered by their 'position' field to preserve the original order.
 *
 * @returns {Promise<Object>} An object containing arrays of words grouped by their type.
 * Each word object will include its Firestore document ID.
 */
export const getAllWords = async () => {
    try {
        // Query the 'words' collection, ordering by position
        const wordsCollection = query(collection(db, 'words'), orderBy('position'));

        // Fetch all documents from the 'words' collection
        const snapshot = await getDocs(wordsCollection);

        // Initialize an object to group words by type
        const wordsByType = {};

        // Process each document in the snapshot
        snapshot.forEach(doc => {
            const data = doc.data(); // Extract document data
            const id = doc.id; // Get the document ID

            // Destructure and group by 'type'
            const { type, ...wordData } = data;

            // Initialize the type group if it doesn't exist
            if (!wordsByType[type]) {
                wordsByType[type] = [];
            }

            // Add the word data to the appropriate type group, including the ID
            wordsByType[type].push({ id, type, ...wordData });
        });

        return wordsByType;
    } catch (error) {
        console.error('Error fetching words from Firestore:', error);
        throw error; // Propagate error for handling
    }
};

export const getAllWordsForUser = async (userId) => {
    try {
        // Ensure the user ID is valid
        if (!userId) {
            throw new Error("Invalid user ID");
        }

        // Reference the user's document in the 'users' collection
        const userDocRef = doc(db, 'users', userId);

        // Fetch the user document
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error(`User with ID ${userId} does not exist.`);
        }

        // Extract the 'words' attribute from the user document
        const userData = userDoc.data();
        const userWords = userData.words || {};

        if (Object.keys(userWords).length === 0) {
            throw new Error('No words found for the user.');
        }

        // Convert the words object into an array and sort by 'position'
        const sortedWords = Object.entries(userWords)
            .map(([id, wordData]) => ({ id, ...wordData })) // Convert the words to an array of objects
            .sort((a, b) => a.position - b.position); // Sort by 'position'

        // Initialize an object to group words by type
        const wordsByType = {};

        // Process each sorted word
        sortedWords.forEach(({ id, type, ...wordData }) => {
            // Initialize the type group if it doesn't exist
            if (!wordsByType[type]) {
                wordsByType[type] = [];
            }

            // Add the word data to the appropriate type group, including the ID
            wordsByType[type].push({ id, type, ...wordData });
        });

        return wordsByType;
    } catch (error) {
        console.error('Error fetching user words from Firestore:', error);
        throw error; // Propagate error for handling
    }
}