import React, {useEffect, useState} from 'react';
import './App.css';
import FullList from "./FullList.jsx";
import FavoritesList from "./FavoriteList.jsx";

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
}]

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

    // Process wordsData to add attemptStatus and isFavorite property
    useEffect(() => {
        const processedWords = wordsData.map(word => ({
            ...word, attemptStatus: 'unattempted', isFavorite: false,
        }));
        setWords(processedWords);
        // Ensure the initial value is set correctly
        if (processedWords.length > 0) {
            setCurrentWordEnglishFull(processedWords[0].english);
        }
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
    const filteredWords = searchQuery.length > 0
        ? words.filter(word => word.english.toLowerCase().includes(searchQuery.toLowerCase()))
        : words;


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
