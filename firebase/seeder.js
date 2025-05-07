import { collection, setDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';
import wordsData from '../data/wordsData'; // Adjust the path as necessary

/**
 * Seeds the Firestore database with wordsData.
 * Each word will have an additional 'position' field to preserve order
 * and 'score' initialized to null or 0 if unlocked.
 */
export const seedFirestore = async () => {
    try {
        const wordTypes = Object.keys(wordsData); // ['noun', 'verb', 'adjective', 'adverb']

        for (const type of wordTypes) {
            const words = wordsData[type];

            // Iterate over words and assign position based on their index
            for (const [index, word] of words.entries()) {
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
                    scoreValue = 3; // Unlocked
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
            }
        }

        console.log('Firestore seeding completed successfully.');

        // Initialize unlockedWords after seeding words
        await initializeUnlockedWords();

    } catch (error) {
        console.error('Error seeding Firestore:', error);
    }
};

/**
 * Initializes the `unlockedWords` collection with all words that have a non-null score.
 * This should be run once during the seeding process.
 */
export const initializeUnlockedWords = async () => {
    try {
        const wordsQuery = query(
            collection(db, 'words'),
            where('score', '!=', null), // Filter words with a non-null score
            orderBy('type'),
            orderBy('score'),
            orderBy('position') // Maintain proper sorting order
        );

        const snapshot = await getDocs(wordsQuery);

        for (const docSnapshot of snapshot.docs) {
            const wordData = docSnapshot.data();
            const unlockedWordRef = doc(collection(db, 'unlockedWords'), docSnapshot.id);

            // Add word to unlockedWords collection
            await setDoc(unlockedWordRef, wordData, { merge: true });
            console.log(`Initialized unlocked word: ${wordData.german} (ID: ${docSnapshot.id})`);
        }

        console.log('UnlockedWords collection initialized successfully.');
    } catch (error) {
        console.error('Error initializing unlockedWords collection:', error);
    }
};

export const initializeUserWords = async (userId) => {
    try {
        const wordTypes = Object.keys(wordsData); // ['noun', 'verb', 'adjective', 'adverb']

        for (const type of wordTypes) {
            const words = wordsData[type];

            for (const [index, word] of words.entries()) {
                const article = word.article || 'noart';
                const docId = `${type}-${article}-${word.german}`;
                const docRef = doc(collection(db, `users/${userId}/words`), docId);

                const isUnlocked = index < 3;
                let scoreValue = null;

                if (isUnlocked) {
                    scoreValue = 3; // Unlocked
                }

                const wordData = {
                    ...word,
                    type,
                    position: index,
                    score: scoreValue,
                    completed: false,
                };

                await setDoc(docRef, wordData, { merge: true });
                console.log(`Seeded word for user ${userId}: ${word.german} (ID: ${docId}, Position: ${index})`);
            }
        }

        console.log(`Firestore seeding for user ${userId} completed successfully.`);
    } catch (error) {
        console.error(`Error seeding Firestore for user ${userId}:`, error);
    }
};

export const initializeUserUnlockedWords = async (userId) => {
    try {
        const wordsQuery = query(
            collection(db, `users/${userId}/words`),
            where('score', '!=', null),
            orderBy('type'),
            orderBy('score'),
            orderBy('position')
        );

        const snapshot = await getDocs(wordsQuery);

        for (const docSnapshot of snapshot.docs) {
            const wordData = docSnapshot.data();
            const unlockedWordRef = doc(collection(db, `users/${userId}/unlockedWords`), docSnapshot.id);

            await setDoc(unlockedWordRef, wordData, { merge: true });
            console.log(`Initialized unlocked word for user ${userId}: ${wordData.german} (ID: ${docSnapshot.id})`);
        }

        console.log(`UnlockedWords collection initialized successfully for user ${userId}.`);
    } catch (error) {
        console.error(`Error initializing unlockedWords collection for user ${userId}:`, error);
    }
}

