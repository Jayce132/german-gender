import AsyncStorage from '@react-native-async-storage/async-storage';

const SCORE_PREFIX = 'score_';

/**
 * Retrieves the score for a specific word.
 * @param {string} type - The type of the word (e.g., noun, verb).
 * @param {string} german - The German word.
 * @returns {Promise<number>} - The score of the word.
 */
export const getWordScore = async (type, german) => {
    try {
        const key = `${SCORE_PREFIX}${type}_${german}`;
        const scoreStr = await AsyncStorage.getItem(key);
        if (scoreStr !== null) {
            return parseInt(scoreStr, 10);
        }
        return null; // Default score null if not set, this means that the word is locked.
    } catch (error) {
        console.error('Error getting word score:', error);
        return 0;
    }
};

/**
 * Sets the score for a specific word.
 * Logs the updated AsyncStorage content after setting the score.
 * @param {string} type - The type of the word (e.g., noun, verb).
 * @param {string} german - The German word.
 * @param {number} score - The new score to set.
 */
export const setWordScore = async (type, german, score) => {
    try {
        const key = `${SCORE_PREFIX}${type}_${german}`;
        await AsyncStorage.setItem(key, score.toString());
        console.log(`Score updated for ${type} "${german}" to ${score}.`);

        // Log the entire AsyncStorage content
        const allScores = await getAllScores();
        console.log('Current AsyncStorage Scores:');
        console.log(JSON.stringify(allScores, null, 2)); // Pretty print with 2-space indentation
    } catch (error) {
        console.error('Error setting word score:', error);
    }
};

/**
 * Retrieves all scores from AsyncStorage.
 * @returns {Promise<Object>} - An object containing all word scores.
 */
export const getAllScores = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const scoreKeys = keys.filter(key => key.startsWith(SCORE_PREFIX));
        const stores = await AsyncStorage.multiGet(scoreKeys);
        const scores = {};
        stores.forEach(([key, value]) => {
            const [_, type, ...germanParts] = key.split('_');
            const german = germanParts.join('_'); // In case the German word contains underscores
            scores[`${type}_${german}`] = parseInt(value, 10);
        });
        return scores;
    } catch (error) {
        console.error('Error getting all scores:', error);
        return {};
    }
};

/**
 * Clears all scores from AsyncStorage.
 * Useful for debugging purposes.
 */
export const clearAllScores = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const scoreKeys = keys.filter(key => key.startsWith(SCORE_PREFIX));
        await AsyncStorage.multiRemove(scoreKeys);
        console.log('All scores have been cleared from AsyncStorage.');
    } catch (error) {
        console.error('Error clearing scores:', error);
    }
};
