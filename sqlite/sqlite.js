import * as SQLite from 'expo-sqlite';
import wordsData from "../data/wordsData";

const createTables = async (db) => {
    try {
        await db.execAsync('PRAGMA foreign_keys = ON;');
        await db.execAsync(
            `
                CREATE TABLE IF NOT EXISTS sentences
                (
                    id               INTEGER PRIMARY KEY AUTOINCREMENT,
                    german_sentence  TEXT,
                    english_sentence TEXT
                );
                CREATE TABLE IF NOT EXISTS words
                (
                    id          TEXT PRIMARY KEY,
                    completed   BOOLEAN,
                    english     TEXT,
                    german      TEXT,
                    position    INTEGER,
                    score       INTEGER,
                    sentence_id INTEGER,
                    subtype     TEXT,
                    type        TEXT,
                    article     TEXT,
                    FOREIGN KEY (sentence_id) REFERENCES sentences (id)
                );
                CREATE TABLE IF NOT EXISTS forms
                (
                    id          INTEGER PRIMARY KEY AUTOINCREMENT,
                    word_id     TEXT, -- the word this form belongs to
                    form        TEXT,
                    explanation TEXT,
                    FOREIGN KEY (word_id) REFERENCES words (id)
                );`
        );
        console.log('Tables created');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

const insertWords = async (db) => {
    try {
        for (const [type, words] of Object.entries(wordsData)) {
            for (const word of words) {
                const index = words.indexOf(word);
                const article = word.article || 'noart';
                const wordId = type + '-' + article + '-' + word.german;

                const sentence = word.sentence;
                const result = await db.runAsync(
                    `INSERT INTO sentences (german_sentence, english_sentence) VALUES (?, ?);`,
                    [sentence.german, sentence.english]
                );

                const sentenceId = result.lastInsertRowId;

                await db.runAsync(
                    `INSERT INTO words (id, completed, english, german, position, score, sentence_id, subtype, type, article)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [wordId, false, word.english, word.german, index, 0, sentenceId, word.subtype, type, word.article]
                );

                const forms = word.forms;
                if (forms) {
                    for (const formObj of forms) {
                        const {form, explanation} = formObj;
                        await db.runAsync(
                            `INSERT INTO forms (word_id, form, explanation) VALUES (?, ?, ?);`,
                            [wordId, form, explanation]
                        );
                    }
                }
            }
        }
        console.log('Words inserted');
    } catch (error) {
        console.error('Error inserting words:', error);
    }
};

const dropTables = async (db) => {
    await db.runAsync(`DROP TABLE IF EXISTS forms;`);
    await db.runAsync(`DROP TABLE IF EXISTS words;`);
    await db.runAsync(`DROP TABLE IF EXISTS sentences;`);
    console.log('Tables dropped');
};

export const getAllWordsForGuest = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('wordsDatabase.sqlite');

        // Fetch all words
        const words = await db.getAllAsync(`SELECT * FROM words`);

        // Prepare the result object
        const wordsByType = {};

        // Process each word
        for (const word of words) {
            // Fetch all forms for the word
            const forms = await db.getAllAsync(
                `SELECT * FROM forms WHERE word_id = ?`,
                [word.id]
            );

            // Remove unnecessary fields from forms
            if (forms) {
                for (const form of forms) {
                    delete form.word_id;
                    delete form.id;
                }
            }
            word.forms = forms;

            // Fetch the sentence for the word
            const sentence = await db.getFirstAsync(
                `SELECT * FROM sentences WHERE id = ?`,
                [word.sentence_id]
            );

            // Remove unnecessary fields and add sentence to the word
            if (sentence) {
                delete sentence.id;
                word.sentence = sentence;
            }
            delete word.sentence_id;

            // Group words by type
            if (!wordsByType[word.type]) {
                wordsByType[word.type] = [];
            }
            wordsByType[word.type].push(word);
        }

        await db.closeAsync();
        console.log('Words fetched for guest successfully');
        return wordsByType;
    } catch (error) {
        console.error('Error getting words for guest:', error);
        return null;
    }
};

const initDb = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('wordsDatabase.sqlite');
        // await dropTables(db);
        await createTables(db);

        const wordsCount = await db.getFirstAsync(`SELECT COUNT(*) as count FROM words`);
        if (wordsCount.count === 0) {
            await insertWords(db);
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export default initDb;
