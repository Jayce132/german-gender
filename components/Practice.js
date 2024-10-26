import React, {useEffect, useState} from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView,
} from 'react-native';
import colors from '../styles/colors';
import wordsData from '../data/wordsData';
import Revision from './Revision';

const Practice = ({numWordsToPractice, wordType, setSelectedComponent}) => {
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [selectedGender, setSelectedGender] = useState('');
    const [germanWordInput, setGermanWordInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [isReview, setIsReview] = useState(false);
    const [practiceRound, setPracticeRound] = useState(1);
    const [isReady, setIsReady] = useState(false);

    // Initialize and process words on mount
    useEffect(() => {
        const handleFetchAndProcessWords = () => {
            // Get words array for the selected word type
            const wordList = wordsData[wordType] || [];

            // Shuffle the word list
            const shuffledWords = wordList.sort(() => Math.random() - 0.5);

            // Limit the number of words
            const limitedWords = shuffledWords.slice(0, numWordsToPractice);

            const processedWords = limitedWords.map((word, index) => ({
                ...word,
                attemptStatus: 'unattempted',
                id: `${word.english}-${index}`,
                type: wordType,
            }));
            setWords(processedWords);
        };

        handleFetchAndProcessWords();
    }, [numWordsToPractice, wordType]);

    const currentWord = words[currentWordIndex];

    // Handle answer submission
    const handleAnswerCheck = () => {
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
        const updatedWords = words.map((word, index) => {
            if (index === currentWordIndex) {
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
        // Check if we have reached the end of the words list
        if (currentWordIndex + 1 >= words.length) {
            // Check if there are any incorrect words
            const incorrectWords = words.filter(word => word.attemptStatus === 'incorrect');

            if (incorrectWords.length > 0) {
                // Reset the words array to only incorrect words and generate new IDs
                const resetWords = incorrectWords.map((word, index) => ({
                    ...word,
                    attemptStatus: 'unattempted',
                    id: `${word.english}-retry-${practiceRound}-${index}`, // Generate new unique ID
                }));
                setWords(resetWords);
                setCurrentWordIndex(0);
                setPracticeRound(practiceRound + 1);

                // Reset form states
                setSelectedGender('');
                setGermanWordInput('');
                setFeedback('');
                setIsReview(false);
            } else {
                // All words have been practiced correctly, navigate back to Home
                setSelectedComponent('Home');
            }
        } else {
            // Move to the next word
            setCurrentWordIndex(currentWordIndex + 1);

            // Reset form states
            setSelectedGender('');
            setGermanWordInput('');
            setFeedback('');
            setIsReview(false);
        }
    };

    // Unified submit/continue handler
    const handleSubmit = () => {
        if (!isReview) {
            handleAnswerCheck();
        } else {
            handleContinue();
        }
    };

    return (
        <SafeAreaView style={styles.app}>
            <StatusBar barStyle="light-content" backgroundColor={colors.backgroundColor}/>
            <View style={styles.mainContainer}>
                {!isReady ? (
                    <Revision
                        numWordsToPractice={numWordsToPractice}
                        wordType={wordType}
                        onReady={() => setIsReady(true)}
                    />
                ) : (
                    <>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.wordListContainer}
                            contentContainerStyle={styles.wordListContent}
                        >
                            {words.map((word, index) => {
                                const isCurrent = index === currentWordIndex;
                                const itemStyles = [styles.wordItem];
                                const textStyles = [styles.wordItemText];

                                if (isCurrent) {
                                    itemStyles.push(styles.currentWordItem);
                                    textStyles.push(styles.currentWordText);
                                }

                                if (word.attemptStatus === 'correct') {
                                    itemStyles.push(styles.correctWordItem);
                                    textStyles.push(styles.statusText);
                                } else if (word.attemptStatus === 'incorrect') {
                                    itemStyles.push(styles.incorrectWordItem);
                                    textStyles.push(styles.statusText);
                                }

                                return (
                                    <View key={word.id} style={itemStyles}>
                                        <Text style={textStyles}>{word.english}</Text>
                                    </View>
                                );
                            })}
                        </ScrollView>

                        {/* Main Content */}
                        {currentWord && (
                            <View style={styles.mainContent}>
                                {/* Optional: Display Practice Round */}
                                {practiceRound > 1 && (
                                    <Text style={styles.roundText}>Round {practiceRound}</Text>
                                )}

                                <View key={currentWord.english} style={styles.fadeIn}>
                                    {!isReview ? (
                                        <Text style={styles.wordDisplayText}>
                                            {currentWord.english}
                                        </Text>
                                    ) : (
                                        <Text style={styles.wordDisplayText}>
                                            {currentWord.type === 'noun' && selectedGender
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

                                {/* Display Word Placeholder */}
                                {!isReview && (
                                    <View style={styles.placeholderContainer}>
                                        {Array.from({length: currentWord.german.length}).map((_, index) => (
                                            <Text key={index} style={styles.placeholderText}>_</Text>
                                        ))}
                                    </View>
                                )}

                                {/* Conditional Rendering: Show Form or Feedback */}
                                {!isReview ? (
                                    <>
                                        {/* Gender Buttons - Only for Nouns */}
                                        {currentWord.type === 'noun' && (
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
                                                placeholder={`Type the German ${currentWord.type}`}
                                                placeholderTextColor="#999"
                                                editable={!isReview}
                                            />
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                style={[styles.submitButton]}
                                            >
                                                <Text style={styles.submitButtonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
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
                                            <Text style={styles.submitButtonText}>
                                                {(currentWordIndex + 1 >= words.length && words.some(word => word.attemptStatus === 'incorrect'))
                                                    ? 'Retry Incorrect Words'
                                                    : (currentWordIndex + 1 >= words.length)
                                                        ? 'Finish'
                                                        : 'Continue'}
                                            </Text>
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
        paddingTop: 20,
    },
    wordListContainer: {
        maxHeight: 50,
        marginBottom: 10,
    },
    wordListContent: {
        alignItems: 'center',
    },
    wordItem: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginHorizontal: 5,
        backgroundColor: colors.buttonBackgroundColor,
    },
    wordItemText: {
        color: colors.textColor,
        fontSize: 14,
        fontWeight: '500',
    },
    currentWordItem: {
        borderColor: colors.highlightColor,
        borderWidth: 2,
    },
    currentWordText: {
        color: colors.highlightColor,
    },
    correctWordItem: {
        backgroundColor: colors.successColor,
    },
    incorrectWordItem: {
        backgroundColor: colors.errorColor,
    },
    statusText: {
        color: '#fff',
    },
    mainContent: {
        alignItems: 'center',
        paddingVertical: 20,
        flex: 1,
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
    roundText: {
        fontSize: 18,
        color: colors.textColor,
        marginBottom: 10,
    },
    placeholderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    placeholderText: {
        fontSize: 32,
        color: '#999',
        marginHorizontal: 5,
    },
});

export default Practice;
