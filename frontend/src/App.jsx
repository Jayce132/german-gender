import React, { useEffect, useState } from 'react';
import './App.css';
import FullList from "./FullList.jsx";
import FavoritesList from "./FavoriteList.jsx";
import { db } from './firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';



const App = () => {
    const [words, setWords] = useState([]); // State to hold the processed words array

    const [selectedGender, setSelectedGender] = useState('');
    const [germanNoun, setGermanNoun] = useState('');

    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState(''); // For styling feedback message
    const [isReview, setIsReview] = useState(false); // Don't continue immediately after Submit

    // State for managing current selection in the FullList and FavoritesList separately
    const [currentWordEnglishFull, setCurrentWordEnglishFull] = useState('');
    const [currentWordEnglishFavorites, setCurrentWordEnglishFavorites] = useState('');

    // State to determine which list to iterate through: 'full' or 'favorites'
    const [iterationMode, setIterationMode] = useState('full'); // 'full' or 'favorites'

    const [searchQuery, setSearchQuery] = useState(''); // State for the search query above main panel

    useEffect(() => {
        const fetchAndProcessWords = async () => {
            const wordsCollectionRef = collection(db, "words");
            const q = query(wordsCollectionRef, orderBy("createdAt"));
            const querySnapshot = await getDocs(q);
            const fetchedWords = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Process fetched words to add additional properties like attemptStatus and isFavorite
            const processedWords = fetchedWords.map(word => ({
                ...word,
                attemptStatus: 'unattempted',
                isFavorite: false,
            }));

            setWords(processedWords);

            // Sets the current word to be the first word on the list
            if (processedWords.length > 0) {
                setCurrentWordEnglishFull(processedWords[0].english);
            }
        };

        fetchAndProcessWords();
    }, []);

    // Find the current word based on its English name
    const currentWordEnglishToUse = iterationMode === 'full' ? currentWordEnglishFull : currentWordEnglishFavorites;
    const currentWordToShow = words.find(word => word.english === currentWordEnglishToUse) || {};


    const handleAnswerCheck = () => {
        // Determine which word is currently being checked based on iterationMode
        const currentWordEnglish = iterationMode === 'full' ? currentWordEnglishFull : currentWordEnglishFavorites;
        const currentWord = words.find(word => word.english === currentWordEnglish);

        // Update the words state with the attempt status for the current word
        const updatedWords = words.map(word => {
            if (word.english === currentWordEnglish) {
                return {
                    ...word,
                    attemptStatus: selectedGender === word.article && germanNoun.toLowerCase() === word.german.toLowerCase() ? 'correct' : 'incorrect'
                };
            }
            return word;
        });

        setWords(updatedWords);

        // Provide feedback based on whether the attempt was correct or not
        const isCorrect = selectedGender === currentWord.article && germanNoun.toLowerCase() === currentWord.german.toLowerCase();
        setFeedback(isCorrect ? "Correct!" : `Correct answer: ${currentWord.article} ${currentWord.german}`);
        setFeedbackClass(isCorrect ? "text-success" : "text-error");

        setIsReview(true);
    };

    const handleContinue = () => {
        const currentList = iterationMode === 'full' ? words : words.filter(word => word.isFavorite);
        const currentWordEnglish = iterationMode === 'full' ? currentWordEnglishFull : currentWordEnglishFavorites;
        const currentIndex = currentList.findIndex(word => word.english === currentWordEnglish);
        const nextIndex = (currentIndex + 1) % currentList.length;
        const nextWord = currentList[nextIndex].english;

        if (iterationMode === 'full') {
            setCurrentWordEnglishFull(nextWord);
        } else {
            setCurrentWordEnglishFavorites(nextWord);
        }

        // Reset the form for the next word
        setSelectedGender('');
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isReview) {
            handleAnswerCheck();
        } else {
            handleContinue();
        }
    };

    // Handles word selection in the FullList
    const handleSelectWordFull = (wordEnglish) => {
        setCurrentWordEnglishFull(wordEnglish);
        setCurrentWordEnglishFavorites(''); // Clear the selection in the FavoritesList
        setIterationMode('full'); // Automatically switch to iterating through the full list
        setSelectedGender('');
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
    };

    // Handles word selection in the FavoritesList
    const handleSelectWordFavorites = (wordEnglish) => {
        setCurrentWordEnglishFavorites(wordEnglish);
        setCurrentWordEnglishFull(''); // Clear the selection in the FullList
        setIterationMode('favorites'); // Automatically switch to iterating through the favorites list
        setSelectedGender('');
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
    };


    const handleToggleFavorite = (wordEnglish) => {
        const updatedWords = words.map(word => {
            if (word.english === wordEnglish) {
                return {...word, isFavorite: !word.isFavorite};
            }
            return word;
        });

        // Update the words state with the new favorite status
        setWords(updatedWords);

        // Check if the unfavorited word is the currently displayed word in 'favorites' mode
        if (iterationMode === 'favorites' && (!updatedWords.find(word => word.isFavorite && word.english === currentWordEnglishFavorites) || updatedWords.filter(word => word.isFavorite).length === 0)) {
            // If the unfavorited word was the last favorite or the currently displayed word, switch to the full list
            setIterationMode('full');

            // Select the next word in the full list or default back to the first word if none is selected
            if (!currentWordEnglishFull) {
                setCurrentWordEnglishFull(words[0].english);
            }
        }
    };

    // Filtering logic for the main panel based on search query
    const filteredWords = searchQuery.length > 0 ? words.filter(word => word.english.toLowerCase().includes(searchQuery.toLowerCase())) : words;


    return (<div className="App" style={{display: 'flex', flexDirection: 'row', alignItems: 'start', height: '100vh'}}>

        <FavoritesList
            words={filteredWords.filter(word => word.isFavorite)}
            onSelectWord={handleSelectWordFavorites}
            currentSelectedWord={currentWordEnglishFavorites}
            toggleFavorite={handleToggleFavorite}
        />

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100}}>

            {/* Search Bar */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '10px'}}>
                <input
                    type="text"
                    placeholder="Search words..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{width: '60%', padding: '10px', marginBottom: '20px'}} // Adjust width as needed
                />
            </div>

            <div>
                <img src={currentWordToShow.image} alt={currentWordToShow.english} style={{
                    maxWidth: '30vh', height: '30vh', objectFit: 'cover', display: 'block', margin: '0 auto'
                }}/>
                <p style={{textAlign: 'center'}}>{`the ${currentWordToShow.english}`}</p>
            </div>
            <div>
                {['der', 'die', 'das'].map((gender) => (<button key={gender} onClick={() => setSelectedGender(gender)}
                                                                className={selectedGender === gender ? 'selected' : ''}
                                                                style={{margin: '0 10px'}}
                                                                disabled={isReview}>
                    {gender}
                </button>))}
            </div>
            <form onSubmit={handleSubmit}
                  style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
                <input type="text" value={germanNoun} onChange={(e) => setGermanNoun(e.target.value)}
                       placeholder="Type the German noun" required style={{marginBottom: '10px'}}
                       disabled={isReview}/>
                <button type="submit">{isReview ? 'Continue' : 'Submit'}</button>
            </form>
            {feedback && <p className={feedbackClass}>{feedback}</p>}
        </div>

        <FullList
            words={filteredWords}
            onSelectWord={handleSelectWordFull}
            currentSelectedWord={currentWordEnglishFull}
            toggleFavorite={handleToggleFavorite}
        />

    </div>);

};

export default App;
