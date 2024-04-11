import React, {useEffect, useState} from 'react';
import './App.css';
import FullList from "./FullList.jsx";
import FavoritesList from "./FavoriteList.jsx";
import {fetchWords, addWord, updateWord, deleteWord} from './api/wordsApi';
import WordModal from "./WordModal.jsx";

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentWordDetails, setCurrentWordDetails] = useState(null);

    const handleFetchAndProcessWords = async () => {
        const fetchedWords = await fetchWords();

        // Process fetched words
        const processedWords = fetchedWords.map(word => ({
            ...word, attemptStatus: 'unattempted', isFavorite: false,
        }));
        setWords(processedWords);

        // Set the first word as the current word
        if (processedWords.length > 0) {
            setCurrentWordEnglishFull(processedWords[0].english);
        }
    };


    useEffect(() => {
        handleFetchAndProcessWords();
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


    const closeModal = () => setIsModalOpen(false);

    // Function to open the modal for adding
    const openAddModal = () => {
        setIsModalOpen(true);
        setModalMode('add');
        setCurrentWordDetails(null); // Clear any previous edit details
    };

    // Function to open the modal for editing
    const openEditModal = (wordDetails) => {
        setIsModalOpen(true);
        setModalMode('edit');
        setCurrentWordDetails(wordDetails);
    };

    const handleSaveWord = async (wordData, id = null) => {
        if (id) {
            try {
                await updateWord(id, wordData);
            } catch (error) {
                console.error("Error updating word: ", wordData);
            }
        } else {
            try {
                await addWord(wordData);
            } catch (error) {
                console.error("Error adding word: ", wordData);
            }

        }
        handleFetchAndProcessWords();
        closeModal();
    };

    const handleDeleteWord = async (id) => {
        try {
            await deleteWord(id);
            console.log(`Word with ID: ${id} deleted`);
            handleFetchAndProcessWords();
        } catch (error) {
            console.error("Error deleting word: ", error);
        }

    };


    return (<div className="App">

        <div className="sidebar left">

            <FavoritesList
                words={filteredWords.filter(word => word.isFavorite)}
                onSelectWord={handleSelectWordFavorites}
                currentSelectedWord={currentWordEnglishFavorites}
                toggleFavorite={handleToggleFavorite}
            />

        </div>

        {isModalOpen && <WordModal onClose={closeModal} onSave={handleSaveWord} wordDetails={currentWordDetails}
                                   isEditMode={modalMode === 'edit'}/>}

        <div className="mainContent">


            {/* Search Bar */}
            <div>
                <input
                    className="searchInput" type="text"
                    placeholder="Search words..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <div key={currentWordToShow.id} className="fade-in">
                <div className="wordImageContainer">
                    <img className="wordDisplayImage" src={currentWordToShow.image}
                         alt={currentWordToShow.english}/>
                </div>
                <p className="wordDisplayText">{`the ${currentWordToShow.english}`}</p>
            </div>
            <div>
                {['der', 'die', 'das'].map((gender) => (<button key={gender} onClick={() => setSelectedGender(gender)}
                                                                className={`${selectedGender === gender ? 'selected ' : ''}genderSelectButton`}
                                                                disabled={isReview}>
                    {gender}
                </button>))}
            </div>
            <form onSubmit={handleSubmit} className="germanNounForm"
            >
                <input className="germanNounInput" type="text" value={germanNoun}
                       onChange={(e) => setGermanNoun(e.target.value)}
                       placeholder="Type the German noun" required
                       disabled={isReview}/>
                <button type="submit">{isReview ? 'Continue' : 'Submit'}</button>
            </form>
            {feedback && <p className={feedbackClass}>{feedback}</p>}


        </div>

        <div className="sidebar right">


            <FullList
                words={filteredWords}
                onSelectWord={handleSelectWordFull}
                currentSelectedWord={currentWordEnglishFull}
                toggleFavorite={handleToggleFavorite}
                onAddNewWord={openAddModal}
                onEditWord={openEditModal}
                onDeleteWord={handleDeleteWord}
            />

        </div>

    </div>);

};

export default App;
