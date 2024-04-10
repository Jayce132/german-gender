import React, {useEffect, useState} from 'react';
import './App.css';

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

    const [currentWordEnglish, setCurrentWordEnglish] = useState(''); // Current word english property

    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState(''); // For styling feedback message
    const [isReview, setIsReview] = useState(false); // Don't continue immediately after Submit

    // Process wordsData to add attemptStatus and isFavorite property
    useEffect(() => {
        const processedWords = wordsData.map(word => ({
            ...word, attemptStatus: 'unattempted', isFavorite: false,
        }));
        setWords(processedWords);
        // Ensure the initial value is set correctly
        if (processedWords.length > 0) {
            setCurrentWordEnglish(processedWords[0].english);
        }
    }, []);

    // Find the current word based on its English name
    const currentWord = words.find(word => word.english === currentWordEnglish) || words[0];

    const handleAnswerCheck = () => {
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

        const isCorrect = selectedGender === currentWord.article && germanNoun.toLowerCase() === currentWord.german.toLowerCase();
        setFeedback(isCorrect ? "Correct!" : `Correct answer: ${currentWord.article} ${currentWord.german}`);
        setFeedbackClass(isCorrect ? "text-success" : "text-error");
        setIsReview(true);
    };


    const handleContinue = () => {
        const currentIndex = words.findIndex(word => word.english === currentWordEnglish);
        const nextWord = words[(currentIndex + 1) % words.length];
        setCurrentWordEnglish(nextWord.english);
        setSelectedGender('');
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
    };

    const handleWordSelect = (wordEnglish) => {
        const updatedWords = words.map((word) => {
            if (word.english === wordEnglish) {
                // Mark the selected word as current
                return {...word, attemptStatus: 'current'};
            } else if (word.attemptStatus !== 'correct' && word.attemptStatus !== 'incorrect') {
                // Reset others to 'unattempted', preserving 'correct' or 'incorrect' statuses
                return {...word, attemptStatus: 'unattempted'};
            }
            return word;
        });

        setWords(updatedWords);
        setCurrentWordEnglish(wordEnglish);
        setSelectedGender('');
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
    };

    const toggleFavorite = (wordEnglish) => {
        const updatedWords = words.map(word => {
            if (word.english === wordEnglish) {
                return {...word, isFavorite: !word.isFavorite};
            }
            return word;
        });
        setWords(updatedWords);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isReview) {
            handleAnswerCheck();
        } else {
            handleContinue();
        }
    };

    return (<div className="App" style={{display: 'flex', flexDirection: 'row', alignItems: 'start', height: '100vh'}}>
        <div className="favoritesList" style={{flex: 1, maxHeight: '90vh', overflowY: 'auto', margin: '50px'}}>
            {words.filter(word => word.isFavorite).map((word) => (
                <div key={word.english} className={`wordItem ${word.attemptStatus}`}>
                    {word.english}
                    <span onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering word selection
                        toggleFavorite(word.english);
                    }}>
                        {word.isFavorite ? '❤️' : '🖤'}
                    </span>
                </div>))}
        </div>

        <div style={{flex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
            <div>
                <img src={currentWord?.image} alt={currentWord?.english} style={{
                    maxWidth: '100%', height: '30vh', objectFit: 'cover', display: 'block', margin: '0 auto'
                }}/>
                <p style={{textAlign: 'center'}}>{`the ${currentWord?.english}`}</p>
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

        <div className="wordList" style={{flex: 1, maxHeight: '90vh', overflowY: 'auto'}}>
            {words.map((word) => (<div key={word.english}
                                       className={`wordItem ${word.attemptStatus} ${word.english === currentWordEnglish ? 'current' : ''}`} // Add 'current' class if this is the current word
                                       onClick={() => handleWordSelect(word.english)}>
                {word.english}
                <span onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering word selection
                    toggleFavorite(word.english);
                }}>
            {word.isFavorite ? '❤️' : '🖤'}
            </span>
            </div>))}
        </div>

    </div>);

};

export default App;
