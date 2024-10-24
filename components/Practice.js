import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import FullList from './FullList';
import colors from '../styles/colors';
import wordsData from '../data/wordsData';

const Practice = ({ numWordsToPractice, wordType }) => {
    const [words, setWords] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [germanWordInput, setGermanWordInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [isReview, setIsReview] = useState(false);
    const [currentWordEnglish, setCurrentWordEnglish] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentWordToShow, setCurrentWordToShow] = useState({});
    const [listMode, setListMode] = useState('full'); // Tracks 'full' or 'favorites'

    // Initialize and process words on mount
    const handleFetchAndProcessWords = () => {
        // Get words array for the selected word type
        const wordList = wordsData[wordType] || [];

        // Limit the number of words
        const limitedWords = wordList.slice(0, numWordsToPractice);

        const processedWords = limitedWords.map((word, index) => ({
            ...word,
            attemptStatus: 'unattempted',
            isFavorite: false,
            id: `${word.english}-${index}`,
            type: wordType,
        }));
        setWords(processedWords);

        if (processedWords.length > 0) {
            setCurrentWordEnglish(processedWords[0].english);
        }
    };

    useEffect(() => {
        handleFetchAndProcessWords();
    }, [numWordsToPractice, wordType]);

    // Filter words based on search query
    const filteredWords =
        searchQuery.length > 0
            ? words.filter((word) =>
                word.english.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : words;

    // Filter favorites based on listMode and search query
    const filteredFavorites =
        listMode === 'favorites'
            ? filteredWords.filter((word) => word.isFavorite)
            : words.filter(
                (word) =>
                    word.isFavorite &&
                    (searchQuery === '' ||
                        word.english.toLowerCase().includes(searchQuery.toLowerCase()))
            );
    const hasFavorites = filteredFavorites.length > 0;
    const hasMatches = filteredWords.length > 0;

    // Update currentWordToShow whenever currentWordEnglish or words change
    useEffect(() => {
        const word =
            words.find((word) => word.english === currentWordEnglish) || {};
        setCurrentWordToShow(word);
    }, [currentWordEnglish, words]);

    // Handle answer submission
    const handleAnswerCheck = () => {
        const currentWord = words.find(
            (word) => word.english === currentWordEnglish
        );
        let isCorrect = false;

        if (currentWord.type === 'noun') {
            isCorrect =
                selectedGender === currentWord.article &&
                germanWordInput.toLowerCase() === currentWord.german.toLowerCase();
        } else {
            isCorrect =
                germanWordInput.toLowerCase() === currentWord.german.toLowerCase();
        }

        // Update attemptStatus for the current word
        const updatedWords = words.map((word) => {
            if (word.english === currentWordEnglish) {
                return {
                    ...word,
                    attemptStatus: isCorrect ? 'correct' : 'incorrect',
                };
            }
            return word;
        });

        setWords(updatedWords);

        // Set feedback message
        let correctAnswer = currentWord.german;
        if (currentWord.type === 'noun') {
            correctAnswer = `${currentWord.article} ${currentWord.german}`;
        }

        setFeedback(isCorrect ? 'Correct!' : `Wrong! Correct: ${correctAnswer}`);
        setFeedbackClass(isCorrect ? 'textSuccess' : 'textError');

        // Enter review mode
        setIsReview(true);
    };

    // Handle moving to the next word
    const handleContinue = () => {
        const currentList =
            listMode === 'full' ? words : words.filter((word) => word.isFavorite);
        const currentIndex = currentList.findIndex(
            (word) => word.english === currentWordEnglish
        );
        const nextIndex = (currentIndex + 1) % currentList.length;
        const nextWord = currentList[nextIndex].english;

        setCurrentWordEnglish(nextWord);

        // Reset form states
        setSelectedGender('');
        setGermanWordInput('');
        setFeedback('');
        setIsReview(false);
    };

    // Unified submit/continue handler
    const handleSubmit = () => {
        if (!isReview) {
            handleAnswerCheck();
        } else {
            handleContinue();
        }
    };

    // Unified word selection handler
    const handleSelectWord = (wordEnglish) => {
        setCurrentWordEnglish(wordEnglish);
        setSelectedGender('');
        setGermanWordInput('');
        setFeedback('');
        setIsReview(false);
        setSearchQuery('');
    };

    // Handle toggling favorites
    const handleToggleFavorite = (wordEnglish) => {
        const updatedWords = words.map((word) => {
            if (word.english === wordEnglish) {
                return { ...word, isFavorite: !word.isFavorite };
            }
            return word;
        });

        setWords(updatedWords);
    };

    useEffect(() => {
        if (listMode === 'favorites' && filteredFavorites.length === 0) {
            setListMode('full');

            if (words.length > 0) {
                setCurrentWordEnglish(words[0].english);
            } else {
                setCurrentWordEnglish('');
            }
        }
    }, [words, listMode, searchQuery, filteredFavorites]);

    return (
        <SafeAreaView style={styles.app}>
            <StatusBar barStyle="light-content" backgroundColor={colors.backgroundColor} />
            <View style={styles.mainContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search words..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>

                {/* Conditional Rendering Based on Search Matches */}
                {hasMatches && (
                    <>
                        <View style={styles.toggleButtonsContainer}>
                            <TouchableOpacity
                                onPress={() => setListMode('full')}
                                style={[
                                    styles.toggleButton,
                                    listMode === 'full' && styles.activeToggleButton,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        listMode === 'full' && styles.activeToggleButtonText,
                                    ]}
                                >
                                    Full List
                                </Text>
                            </TouchableOpacity>
                            {hasFavorites && (
                                <TouchableOpacity
                                    onPress={() => setListMode('favorites')}
                                    style={[
                                        styles.toggleButton,
                                        listMode === 'favorites' && styles.activeToggleButton,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.toggleButtonText,
                                            listMode === 'favorites' && styles.activeToggleButtonText,
                                        ]}
                                    >
                                        Favorite List
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Word List Container */}
                        <View style={styles.listContainer}>
                            <FullList
                                words={listMode === 'full' ? filteredWords : filteredFavorites}
                                onSelectWord={handleSelectWord}
                                currentSelectedWord={currentWordEnglish}
                                toggleFavorite={handleToggleFavorite}
                            />
                        </View>

                        {/* Main Content - Conditionally Rendered */}
                        {currentWordToShow.english && (
                            <View style={styles.mainContent}>
                                <View key={currentWordToShow.english} style={styles.fadeIn}>
                                    {!isReview ? (
                                        <Text style={styles.wordDisplayText}>
                                            {/* Display English word appropriately based on type */}
                                            {currentWordToShow.type === 'verb'
                                                ? currentWordToShow.english
                                                : currentWordToShow.english}
                                        </Text>
                                    ) : (
                                        <Text style={styles.wordDisplayText}>
                                            {currentWordToShow.type === 'noun' && selectedGender
                                                ? `${selectedGender} ${germanWordInput
                                                    .slice(0, 1)
                                                    .toUpperCase()}${germanWordInput
                                                    .slice(1)
                                                    .toLowerCase()}`
                                                : `${germanWordInput
                                                    .slice(0, 1)
                                                    .toUpperCase()}${germanWordInput
                                                    .slice(1)
                                                    .toLowerCase()}`}
                                        </Text>
                                    )}
                                </View>

                                {/* Conditional Rendering: Show Form or Feedback */}
                                {!isReview ? (
                                    <>
                                        {/* Gender Buttons - Only for Nouns */}
                                        {currentWordToShow.type === 'noun' && (
                                            <View style={styles.genderButtonContainer}>
                                                {['der', 'die', 'das'].map((gender) => (
                                                    <TouchableOpacity
                                                        key={gender}
                                                        onPress={() => setSelectedGender(gender)}
                                                        style={[
                                                            styles.genderSelectButton,
                                                            selectedGender === gender &&
                                                            styles.selectedGenderButton,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.genderButtonText,
                                                                selectedGender === gender &&
                                                                styles.selectedGenderText,
                                                            ]}
                                                        >
                                                            {gender}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}

                                        {/* German Word Input */}
                                        <View style={styles.germanWordForm}>
                                            <TextInput
                                                style={styles.germanWordInput}
                                                value={germanWordInput}
                                                onChangeText={(text) => setGermanWordInput(text)}
                                                placeholder={`Type the German ${currentWordToShow.type}`}
                                                placeholderTextColor="#999"
                                                editable={!isReview}
                                            />
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                disabled={words.length === 0}
                                                style={[styles.submitButton]}
                                            >
                                                <Text style={styles.submitButtonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
                                    // Display Feedback and Continue Button
                                    <>
                                        <Text
                                            style={[
                                                styles.feedbackText,
                                                feedbackClass === 'textSuccess'
                                                    ? styles.textSuccess
                                                    : styles.textError,
                                            ]}
                                        >
                                            {feedback}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={[styles.submitButton, styles.continueButton]}
                                        >
                                            <Text style={styles.submitButtonText}>Continue</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 10,
    },
    searchContainer: {
        paddingVertical: 10,
    },
    searchInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
        color: '#fff',
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: 8,
    },
    toggleButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.buttonBackgroundColor,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    activeToggleButton: {
        backgroundColor: colors.highlightColor,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    activeToggleButtonText: {
        color: '#242424',
    },
    listContainer: {
        flex: 1,
    },
    mainContent: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    fadeIn: {
        alignItems: 'center',
    },
    wordDisplayText: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 16,
        color: colors.textColor,
    },
    genderButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    genderSelectButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.buttonBackgroundColor,
        borderRadius: 8,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedGenderButton: {
        borderColor: colors.highlightColor,
        borderWidth: 1,
    },
    genderButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
    },
    selectedGenderText: {
        color: colors.highlightColor,
    },
    germanWordForm: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    germanWordInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontWeight: '500',
        fontSize: 16,
        color: '#fff',
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButton: {
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    feedbackText: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 8,
    },
    textSuccess: {
        color: colors.successColor,
    },
    textError: {
        color: colors.errorColor,
    },
});

export default Practice;
