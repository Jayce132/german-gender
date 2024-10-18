import React, {useEffect, useState} from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard,
} from 'react-native';
import FullList from './FullList';
import colors from '../styles/colors';
import wordsData from '../data/wordsData';

// // Hardcoded wordsData array without images
// const wordsData = [{
//     english: 'apple', german: 'Apfel', article: 'der', translation: 'the apple',
// }, {
//     english: 'car', german: 'Auto', article: 'das', translation: 'the car',
// }, {
//     english: 'tree', german: 'Baum', article: 'der', translation: 'the tree',
// }, {
//     english: 'house', german: 'Haus', article: 'das', translation: 'the house',
// }, {
//     english: 'flower', german: 'Blume', article: 'die', translation: 'the flower',
// },];

const Practice = () => {
    const [words, setWords] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [germanNoun, setGermanNoun] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [isReview, setIsReview] = useState(false);
    const [currentWordEnglish, setCurrentWordEnglish] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentWordToShow, setCurrentWordToShow] = useState({});
    const [listMode, setListMode] = useState('full'); // Tracks 'full' or 'favorites'
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        // handle keyboard show event
        const handleKeyboardShow = () => setKeyboardVisible(true);
        // handle keyboard hide event
        const handleKeyboardHide = () => setKeyboardVisible(false);

        // add event listeners for keyboard show and hide events
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

        // cleanup function to remove event listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Initialize and process words on mount
    const handleFetchAndProcessWords = () => {
        const processedWords = wordsData.map((word, index) => ({
            ...word, attemptStatus: 'unattempted', isFavorite: false, id: `${word.english}-${index}`,
        }));
        setWords(processedWords);

        if (processedWords.length > 0) {
            setCurrentWordEnglish(processedWords[0].english);
        }
    };

    useEffect(() => {
        handleFetchAndProcessWords();
    }, []);

    // Filter words based on search query
    const filteredWords = searchQuery.length > 0 ? words.filter((word) => word.english.toLowerCase().includes(searchQuery.toLowerCase())) : words;

    // Filter favorites based on listMode and search query
    const filteredFavorites = listMode === 'favorites' ? filteredWords.filter((word) => word.isFavorite) : words.filter((word) => word.isFavorite && (searchQuery === '' || word.english.toLowerCase().includes(searchQuery.toLowerCase())));
    const hasFavorites = filteredFavorites.length > 0;
    const hasMatches = filteredWords.length > 0;

    // Update currentWordToShow whenever currentWordEnglish or words change
    useEffect(() => {
        const word = words.find((word) => word.english === currentWordEnglish) || {};
        setCurrentWordToShow(word);
    }, [currentWordEnglish, words]);

    // Handle answer submission
    const handleAnswerCheck = () => {
        const currentWord = words.find((word) => word.english === currentWordEnglish);
        const isCorrect = selectedGender === currentWord.article && germanNoun.toLowerCase() === currentWord.german.toLowerCase();

        // Update attemptStatus for the current word
        const updatedWords = words.map((word) => {
            if (word.english === currentWordEnglish) {
                return {
                    ...word, attemptStatus: isCorrect ? 'correct' : 'incorrect',
                };
            }
            return word;
        });

        setWords(updatedWords);

        // Set feedback message
        setFeedback(isCorrect ? `Correct!` : `Wrong! Correct: ${currentWord.article} ${currentWord.german}`);
        setFeedbackClass(isCorrect ? 'textSuccess' : 'textError');

        // Enter review mode
        setIsReview(true);
    };

    // Handle moving to the next word
    const handleContinue = () => {
        const currentList = listMode === 'full' ? words : words.filter((word) => word.isFavorite);
        const currentIndex = currentList.findIndex((word) => word.english === currentWordEnglish); // Unique ID for FlatList
        const nextIndex = (currentIndex + 1) % currentList.length;
        const nextWord = currentList[nextIndex].english;

        setCurrentWordEnglish(nextWord);

        // Reset form states
        setSelectedGender('');
        setGermanNoun('');
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
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
        setSearchQuery('');
    };

    // Automatically switch to 'full' mode if no favorites are present
    const handleToggleFavorite = (wordEnglish) => {
        const updatedWords = words.map((word) => {
            if (word.english === wordEnglish) {
                return {...word, isFavorite: !word.isFavorite};
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
            <StatusBar barStyle="light-content" backgroundColor={colors.backgroundColor}/>
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
                                style={[styles.toggleButton, listMode === 'full' && styles.activeToggleButton]}
                            >
                                <Text
                                    style={[styles.toggleButtonText, listMode === 'full' && styles.activeToggleButtonText]}>
                                    Full List
                                </Text>
                            </TouchableOpacity>
                            {hasFavorites && (
                                <TouchableOpacity
                                    onPress={() => setListMode('favorites')}
                                    style={[styles.toggleButton, listMode === 'favorites' && styles.activeToggleButton]}
                                >
                                    <Text
                                        style={[styles.toggleButtonText, listMode === 'favorites' && styles.activeToggleButtonText]}>
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
                        {!keyboardVisible && currentWordToShow.english && (
                            <View style={styles.mainContent}>
                                <View key={currentWordToShow.english} style={styles.fadeIn}>
                                    {!isReview ? (
                                        <Text style={styles.wordDisplayText}>
                                            {`the ${currentWordToShow.english}`}
                                        </Text>
                                    ) : (
                                        <Text style={styles.wordDisplayText}>
                                            {`${selectedGender} ${germanNoun[0].toUpperCase() + germanNoun.slice(1).toLowerCase()}`}
                                        </Text>
                                    )}
                                </View>

                                {/* Conditional Rendering: Show Form or Feedback */}
                                {!isReview ? ( // Display Forms
                                    <>
                                        {/* Gender Buttons */}
                                        <View style={styles.genderButtonContainer}>
                                            {['der', 'die', 'das'].map((gender) => (
                                                <TouchableOpacity
                                                    key={gender}
                                                    onPress={() => setSelectedGender(gender)}
                                                    style={[styles.genderSelectButton, selectedGender === gender && styles.selectedGenderButton]}
                                                >
                                                    <Text
                                                        style={[styles.genderButtonText, selectedGender === gender && styles.selectedGenderText]}>
                                                        {gender}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        {/* German Noun Form */}
                                        <View style={styles.germanNounForm}>
                                            <TextInput
                                                style={styles.germanNounInput}
                                                value={germanNoun}
                                                onChangeText={(text) => setGermanNoun(text)}
                                                placeholder="Type the German noun"
                                                placeholderTextColor="#999"
                                                editable={!isReview}
                                            />
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                disabled={words.length === 0}
                                                style={[styles.submitButton]}
                                            >
                                                <Text style={styles.submitButtonText}>
                                                    Submit
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : ( // Display Feedback and Continue Button
                                    <>
                                        <Text
                                            style={[styles.feedbackText, feedbackClass === 'textSuccess' ? styles.textSuccess : styles.textError]}>
                                            {feedback}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={handleSubmit} // Reusing handleSubmit for Continue
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
    germanNounForm: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    germanNounInput: {
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