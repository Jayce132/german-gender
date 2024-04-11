import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export const fetchWords = async () => {
    const querySnapshot = await getDocs(query(collection(db, "words"), orderBy("createdAt")));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addWord = async (wordData) => {
    return await addDoc(collection(db, "words"), {
        ...wordData,
        createdAt: serverTimestamp(),
    });
};

export const updateWord = async (id, wordData) => {
    const wordRef = doc(db, "words", id);
    return await updateDoc(wordRef, wordData);
};

export const deleteWord = async (id) => {
    const wordRef = doc(db, "words", id);
    return await deleteDoc(wordRef);
};
