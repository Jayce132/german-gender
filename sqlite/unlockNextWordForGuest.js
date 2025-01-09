import * as SQLite from 'expo-sqlite';

const unlockNextWordForGuest = async (wordId) => {
    try {
        const db = await SQLite.openDatabaseAsync('wordsDatabase.sqlite');
        // update the score
        await db.runAsync(`
            UPDATE words
            SET unlocked = 1
            WHERE id = ?;
        `, wordId);

        // get the updated word
        return await db.getFirstAsync(`
            SELECT *
            FROM words
            WHERE id = ?;
        `, wordId);
    } catch (error) {
        console.error('Error unlocking the next word or completing the current word:', error);
        return null;
    }
}

export default unlockNextWordForGuest;