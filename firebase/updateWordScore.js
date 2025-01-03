import { doc, updateDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Updates the score of a word in Firestore.
 *
 * @param {string} docId - The custom ID of the document to update.
 * @param {number} newScore - The new score to set.
 * @returns {Promise<void>} Resolves when the update is complete.
 */
export const updateWordScore = async (docId, newScore) => {
    try {
        const docRef = doc(db, 'words', docId);
        await updateDoc(docRef, { score: newScore });
        console.log(`Updated score for ${docId} to ${newScore}`);
    } catch (error) {
        console.error(`Error updating score for ${docId}:`, error);
        throw error;
    }
};

export const updateWordScoreForUser = async (userId, wordId, newScore) => {
    try {
        console.log(userId)
        const docRef = doc(db, 'users', userId, 'words', wordId);
        await updateDoc(docRef, { score: newScore });
        console.log(`Updated score for ${wordId} to ${newScore}`);
    } catch (error) {
        console.error(`Error updating score for ${wordId}:`, error);
        throw error;
    }
}