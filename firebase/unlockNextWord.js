import { doc, getDocs, updateDoc, query, where, collection, orderBy, limit, runTransaction } from 'firebase/firestore';
import { db } from './config';

/**
 * Unlocks the next word and marks the current word as completed.
 * Ensures a word can only unlock one other word and is marked as completed afterward.
 *
 * @param {string} currentWordId - The ID of the word that has reached score 4.
 * @param {string} wordType - The type of the word (e.g., noun, verb, etc.).
 * @returns {Promise<Object|null>} The data of the unlocked word or null if no word is unlocked.
 */
export const unlockNextWord = async (currentWordId, wordType) => {
    try {
        // Run a transaction to ensure atomicity
        const result = await runTransaction(db, async (transaction) => {
            // Step 1: Fetch the current word
            const currentWordRef = doc(db, 'words', currentWordId);
            const currentWordDoc = await transaction.get(currentWordRef);

            if (!currentWordDoc.exists()) {
                throw new Error(`Word with ID ${currentWordId} does not exist.`);
            }

            const currentWordData = currentWordDoc.data();

            // If the word is already completed, do nothing
            if (currentWordData.completed) {
                console.log(`Word ${currentWordId} is already completed. No further action taken.`);
                return null; // No need to return any word if it's already completed
            }

            // Step 2: Mark the current word as completed
            transaction.update(currentWordRef, { completed: true });
            console.log(`Marked word ${currentWordId} as completed.`);

            // Step 3: Find the next word to unlock
            const wordsQuery = query(
                collection(db, 'words'),
                where('type', '==', wordType), // Filter by the same type
                where('score', '==', null), // Only consider words not yet unlocked
                orderBy('position'), // Maintain order
                limit(1) // Get the next word only
            );

            const snapshot = await getDocs(wordsQuery);

            if (!snapshot.empty) {
                // Step 4: Unlock the next word
                const nextWordDoc = snapshot.docs[0];
                const nextWordRef = doc(db, 'words', nextWordDoc.id);

                transaction.update(nextWordRef, { score: 0 });
                console.log(`Unlocked word ${nextWordDoc.id} by setting its score to 0.`);

                // Return the data of the next word
                return nextWordDoc.data();
            } else {
                console.log('No more words to unlock.');
                return null; // Return null if no words are available to unlock
            }
        });

        return result;
    } catch (error) {
        console.error('Error unlocking the next word or completing the current word:', error);
        return null; // Return null in case of error
    }
};
