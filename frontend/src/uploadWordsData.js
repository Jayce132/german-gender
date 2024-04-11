import { db } from './firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const wordsData = [{
    "english": "apple",
    "german": "Apfel",
    "article": "der",
    "translation": "the apple",
    "image": "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "car",
    "german": "Auto",
    "article": "das",
    "translation": "the car",
    "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "tree",
    "german": "Baum",
    "article": "der",
    "translation": "the tree",
    "image": "https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "house",
    "german": "Haus",
    "article": "das",
    "translation": "the house",
    "image": "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "flower",
    "german": "Blume",
    "article": "die",
    "translation": "the flower",
    "image": "https://images.pexels.com/photos/1242286/pexels-photo-1242286.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "bicycle",
    "german": "Fahrrad",
    "article": "das",
    "translation": "the bicycle",
    "image": "https://images.pexels.com/photos/20814059/pexels-photo-20814059/free-photo-of-minimal-pic.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "sun",
    "german": "Sonne",
    "article": "die",
    "translation": "the sun",
    "image": "https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "moon",
    "german": "Mond",
    "article": "der",
    "translation": "the moon",
    "image": "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "star",
    "german": "Stern",
    "article": "der",
    "translation": "the star",
    "image": "https://images.pexels.com/photos/980859/pexels-photo-980859.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "water",
    "german": "Wasser",
    "article": "das",
    "translation": "the water",
    "image": "https://images.pexels.com/photos/261403/pexels-photo-261403.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "book",
    "german": "Buch",
    "article": "das",
    "translation": "the book",
    "image": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "cat",
    "german": "Katze",
    "article": "die",
    "translation": "the cat",
    "image": "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "dog",
    "german": "Hund",
    "article": "der",
    "translation": "the dog",
    "image": "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "computer",
    "german": "Computer",
    "article": "der",
    "translation": "the computer",
    "image": "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "phone",
    "german": "Telefon",
    "article": "das",
    "translation": "the phone",
    "image": "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "pen",
    "german": "Stift",
    "article": "der",
    "translation": "the pen",
    "image": "https://images.pexels.com/photos/7054511/pexels-photo-7054511.jpeg?auto=compress&cs=tinysrgb&w=800"
}, {
    "english": "chair",
    "german": "Stuhl",
    "article": "der",
    "translation": "the chair",
    "image": "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800"
}];

async function uploadData() {
    const wordsCollectionRef = collection(db, "words");

    for (const word of wordsData) {
        try {
            // Add a createdAt field with a server-side timestamp
            const docRef = await addDoc(wordsCollectionRef, {
                ...word,
                createdAt: serverTimestamp(),
            });
            console.log(`Document added: ${docRef.id}`);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
}

uploadData();
