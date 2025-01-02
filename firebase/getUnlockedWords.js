import {collection, getDocs, query, orderBy, setDoc, doc, where, onSnapshot} from 'firebase/firestore';
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

/**
 * Synchronizes the `unlockedWords` collection with the `words` collection.
 * Ensures all words with a non-null score are reflected and updated in `unlockedWords`.
 */
export const synchronizeUnlockedWords = () => {
    try {
        const wordsQuery = query(
            collection(db, 'words'),
            where('score', '!=', null), // Listen for words with non-null scores
            orderBy('type'),
            orderBy('score'),
            orderBy('position') // Maintain sorting order
        );

        // Set up a real-time listener
        onSnapshot(wordsQuery, async (snapshot) => {
            for (const change of snapshot.docChanges()) {
                const wordData = change.doc.data();
                const unlockedWordRef = doc(collection(db, 'unlockedWords'), change.doc.id);

                if (change.type === 'added' || change.type === 'modified') {
                    // Add or update the unlocked word in the collection
                    await setDoc(unlockedWordRef, wordData, { merge: true });
                    console.log(
                        `${change.type === 'added' ? 'Added' : 'Updated'} unlocked word: ${wordData.german} (ID: ${change.doc.id})`
                    );
                } else if (change.type === 'removed') {
                    // Remove the word from the unlockedWords collection
                    await deleteDoc(unlockedWordRef);
                    console.log(`Removed unlocked word: ${wordData.german} (ID: ${change.doc.id})`);
                }
            }
        });

        console.log('Listening for changes in the words collection to update unlockedWords.');
    } catch (error) {
        console.error('Error setting up unlockedWords synchronization:', error);
    }
};
