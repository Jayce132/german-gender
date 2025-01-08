import * as SQLite from 'expo-sqlite';
import wordsData from "../data/wordsData";

const createTables = async (db) => {
    await db.runAsync('PRAGMA foreign_keys = ON;');

    await db.runAsync(
        `CREATE TABLE IF NOT EXISTS words
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
             FOREIGN KEY (sentence_id) REFERENCES sentences (id)
         );`
    );

    await db.runAsync(
        `CREATE TABLE IF NOT EXISTS forms
         (
             id          INTEGER PRIMARY KEY AUTOINCREMENT,
             word_id     TEXT, -- the word this form belongs to
             form        TEXT,
             explanation TEXT,
             FOREIGN KEY (word_id) REFERENCES words (id)
         );`
    );

    await db.runAsync(
        `CREATE TABLE IF NOT EXISTS sentences
         (
             id               INTEGER PRIMARY KEY AUTOINCREMENT,
             german_sentence  TEXT,
             english_sentence TEXT
         );`
    );
    console.log('createTables done');
};

const insertWords = async (db) => {
    // traverse every word category
    for (const [type, words] of Object.entries(wordsData)) {
        // traverse all words in a category
        for (const word of words) {
            const index = words.indexOf(word);
            // create the id of the current word
            const article = word.article || 'noart';
            const wordId = type + '-' + article + '-' + word.german;

            // create the form entries for the current word
            const forms = word.forms;
            for (const formObj of forms) {
                const {form, explanation} = formObj;
                console.log('form:', form, 'explanation:', explanation);
                console.log('wordId:', wordId);
                const result = await db.runAsync(
                    `INSERT INTO forms (word_id, form, explanation)
                     VALUES (?, ?, ?);`,
                    wordId, form, explanation
                );
                console.log(result.lastInsertRowId, result.changes);
                console.log('inserted form');
            }

            // create the sentence entry for the current word
            const sentence = word.sentence;
            const result = await db.runAsync(
                `INSERT INTO sentences (german_sentence, english_sentence)
                 VALUES (?, ?);`,
                [sentence.german, sentence.english]
            );
            const sentenceId = result.insertId;

            // create the word entry for the current word
            db.runAsync(
                `INSERT INTO words (id, completed, english, german, position, score, sentence_id, subtype, type)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [wordId, false, word.english, word.german, index, 0, sentenceId, word.subtype, type]
            );
        }
    }
    console.log('insertWords done');
}

const getFirstWord = async (db) => {
    const result = await db.getAllAsync(
        `SELECT COUNT(*) FROM sentences;`
    );
    console.log(result);
    console.log('getFirstWord done');
}

const dropTables = async (db) => {
    await db.runAsync(`DROP TABLE IF EXISTS words;`);
    await db.runAsync(`DROP TABLE IF EXISTS forms;`);
    await db.runAsync(`DROP TABLE IF EXISTS sentences;`);
    console.log('dropTables done');
};

const initDb = async () => {
    const db = await SQLite.openDatabaseAsync('wordsDatabase.sqlite');

    // await dropTables(db);
    // await createTables(db);
    await insertWords(db);
    // await getFirstWord(db);
};

export default initDb;
