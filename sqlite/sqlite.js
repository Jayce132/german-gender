import * as SQLite from 'expo-sqlite';

export const createTables = async () => {
    console.log('createTables');
    const db = await SQLite.openDatabaseAsync('wordsDatabase.sqlite');

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS words
         (
             id      INTEGER PRIMARY KEY AUTOINCREMENT,
             type    TEXT,
             german  TEXT,
             english TEXT,
             article TEXT,
             subtype TEXT
         );`
    );

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS forms
         (
             id          INTEGER PRIMARY KEY AUTOINCREMENT,
             word_id     INTEGER,
             form        TEXT,
             explanation TEXT,
             FOREIGN KEY (word_id) REFERENCES words (id)
         );`
    );

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS sentences
         (
             id               INTEGER PRIMARY KEY AUTOINCREMENT,
             word_id          INTEGER,
             german_sentence  TEXT,
             english_sentence TEXT,
             FOREIGN KEY (word_id) REFERENCES words (id)
         );`
    );
};

const insertWordsData = async () => {
    await createTables();

    // for (let type in wordsData) {
    //
    // }
};

export default insertWordsData;
