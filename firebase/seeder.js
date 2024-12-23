import { collection, doc, setDoc, getDocs, query, deleteDoc } from 'firebase/firestore';
import { db } from './config';
import wordsData from '../data/wordsData';

/**
 * Seeds the Firestore database with wordsData.
 * Each word will have an additional 'position' field to preserve order
 * and 'score' initialized to null.
 */
export const seedFirestore = async () => {
    try {
        const wordTypes = Object.keys(wordsData); // ['noun', 'verb', 'adjective', 'adverb']

        for (const type of wordTypes) {
            const words = wordsData[type];

            // Iterate over words and assign position based on their index
            words.forEach(async (word, index) => {
                // Determine article or set to 'noart' for non-nouns
                const article = word.article || 'noart';

                // Create a custom ID
                const docId = `${type}-${article}-${word.german}`;

                // Create a document reference with the custom ID
                const docRef = doc(collection(db, 'words'), docId);

                // For the first 3 words of each type, unlock them
                const isUnlocked = index < 3;

                let scoreValue = null;

                if (isUnlocked) {
                    scoreValue = 0;       // Unlocked
                }

                const wordData = {
                    ...word,
                    type,
                    position: index, // Position to preserve order
                    score: scoreValue, // Initialize score to null or 0 if unlocked
                    completed: false,
                };

                // Write data to Firestore
                await setDoc(docRef, wordData, { merge: true });
                console.log(`Seeded word: ${word.german} (ID: ${docId}, Position: ${index})`);
            });
        }

        console.log('Firestore seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding Firestore:', error);
    }
};


/**
 * Deletes all documents from a given collection in Firestore.
 *
 * @param {string} collectionName - The name of the collection to delete.
 */
const deleteCollection = async (collectionName) => {
    try {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);

        const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        console.log(`Deleted all documents from the '${collectionName}' collection.`);
    } catch (error) {
        console.error(`Error deleting '${collectionName}' collection:`, error);
    }
};

/**
 * Deletes all collections: 'words' and 'unlockedWords'.
 */
export const deleteAllCollections = async () => {
    try {
        console.log('Deleting all collections...');
        await deleteCollection('words');
        await deleteCollection('unlockedWords');
        console.log('All collections deleted successfully.');
    } catch (error) {
        console.error('Error deleting collections:', error);
    }
};

