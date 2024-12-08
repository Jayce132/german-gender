import {collection, getDocs, query, orderBy} from 'firebase/firestore';
import {db} from './config';

/**
 * Fetches all unlocked words from the Firestore 'unlockedWords' collection and groups them by type.
 * The words are ordered by their 'score' field (ascending) and then by their 'position' field.
 *
 * @returns {Promise<Object>} An object containing arrays of unlocked words grouped by their type.
 * Each word object will include its Firestore document ID.
 */
export const getUnlockedWords = async () => {
    try {
        // Query the 'unlockedWords' collection, ordering by type, score, and position
        const unlockedWordsQuery = query(
            collection(db, 'unlockedWords'),
            orderBy('type'),
            orderBy('score'),
            orderBy('position')
        );

        // Fetch all documents from the 'unlockedWords' collection
        const snapshot = await getDocs(unlockedWordsQuery);

        // Initialize an object to group unlocked words by type
        const unlockedWordsByType = {};

        // Process each document in the snapshot
        snapshot.forEach((doc) => {
            const data = doc.data(); // Extract document data
            const id = doc.id; // Get the document ID

            // Destructure and group by 'type'
            const {type, ...wordData} = data;

            // Initialize the type group if it doesn't exist
            if (!unlockedWordsByType[type]) {
                unlockedWordsByType[type] = [];
            }

            // Add the word data to the appropriate type group, including the ID
            unlockedWordsByType[type].push({id, type, ...wordData});
        });

        return unlockedWordsByType;
    } catch (error) {
        console.error('Error fetching unlocked words from Firestore:', error);
        throw error; // Propagate error for handling
    }
};
