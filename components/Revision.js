import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../styles/colors';
import Flashcard from './Flashcard';
import CustomAlert from './CustomAlert';
import * as Speech from 'expo-speech';
import highlightSentence from '../utils/highlightSentence';

const Revision = ({ words, onReady }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    // We'll store the randomly selected German and English sentences for the current word:
    const [currentGermanSentence, setCurrentGermanSentence] = useState('');
    const [currentEnglishSentence, setCurrentEnglishSentence] = useState('');

    const currentWord = words[currentWordIndex];

    // Word Navigation Handlers
    const handleNext = () => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentWordIndex > 0) {
            setCurrentWordIndex(currentWordIndex - 1);
        }
    };

    const handleReady = () => {
        if (currentWordIndex < words.length - 1) {
            setIsAlertVisible(true);
        } else {
            onReady();
        }
    };

    const handleCancel = () => {
        setIsAlertVisible(false);
    };

    const handleContinue = () => {
        setIsAlertVisible(false);
        onReady();
    };

    // Speech
    // Function to construct the text to be spoken
    const constructSpeechText = (word) => {
        if (word.article) {
            // For nouns, include the article
            return `${word.article} ${word.german}`;
        }
        // For other types (verbs, adjectives, etc.), just use the German word
        return word.german;
    };

    // Pick a random sentence whenever currentWord changes
    useEffect(() => {
        if (!currentWord) return;

        // Some items have { sentence: { german, english } }
        // Others might have { sentence: [ { german, english }, ... ] }
        // We'll unify these as an array for easier handling:
        const sentenceArray = Array.isArray(currentWord.sentence)
            ? currentWord.sentence
            : [currentWord.sentence];

        // Pick one randomly:
        const randomIndex = Math.floor(Math.random() * sentenceArray.length);
        const randomSentenceObj = sentenceArray[randomIndex];

        setCurrentGermanSentence(randomSentenceObj?.german || '');
        setCurrentEnglishSentence(randomSentenceObj?.english || '');

        // Also handle speech here
        Speech.stop();

        const textToSpeak = constructSpeechText(currentWord);
        const options = {
            language: 'de-DE',
            pitch: 1.0,
            rate: 1.0,
        };

        Speech.speak(textToSpeak, options, (error) => {
            if (error) {
                Alert.alert('Error', 'Failed to speak the word.');
                console.error('Speech.speak error:', error);
            }
        });

        // Cleanup on unmount or re-run
        return () => {
            Speech.stop();
        };
    }, [currentWord]);

    // Highlighting
    // Prepare selectedWords object for highlightSentence
    const selectedWords = currentWord ? { [currentWord.type]: currentWord } : {};

    // Generate highlighted sentences
    const highlightedGermanSentence = currentGermanSentence
        ? highlightSentence(currentGermanSentence, selectedWords)
        : null;

    const highlightedEnglishSentence = currentEnglishSentence
        ? highlightSentence(currentEnglishSentence, selectedWords)
        : null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {currentWord && <Flashcard item={currentWord} />}

                {/* German sentence with highlighted word */}
                {currentWord && (
                    <Text style={styles.sentence}>
                        {highlightedGermanSentence}
                    </Text>
                )}

                {/* English sentence with highlighted word */}
                {currentWord && (
                    <Text style={styles.sentence}>
                        {highlightedEnglishSentence}
                    </Text>
                )}

                <TouchableOpacity onPress={handleReady} style={styles.readyButton}>
                    <Text style={styles.readyButtonText}>Ready</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.navigationContainer}>
                {/* Previous button */}
                <TouchableOpacity
                    onPress={handlePrevious}
                    style={[styles.navButton, currentWordIndex === 0 && styles.hiddenButton]}
                    disabled={currentWordIndex === 0}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>

                {/* Word counter in the middle */}
                {words.length > 0 && (
                    <Text style={styles.wordCounter}>
                        {currentWordIndex + 1} / {words.length}
                    </Text>
                )}

                {/* Next button */}
                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.navButton, currentWordIndex === words.length - 1 && styles.hiddenButton]}
                    disabled={currentWordIndex === words.length - 1}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* Custom Alert Modal */}
            <CustomAlert
                visible={isAlertVisible}
                title="Ready?"
                message="You have not seen all the words yet."
                onCancel={handleCancel}
                onContinue={handleContinue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 10,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    content: {
        alignItems: 'center',
    },
    sentence: {
        fontSize: 16,
        color: colors.textColor,
        marginVertical: 30,
        textAlign: 'center',
    },
    highlight: {
        color: colors.highlightColor,
        fontWeight: 'bold',
    },
    wordCounter: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.textColor,
        marginVertical: 10,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    navButtonText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: '500',
    },
    readyButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    readyButtonText: {
        color: colors.textColor,
        fontSize: 28,
        fontWeight: '500',
    },
    hiddenButton: {
        opacity: 0,
    },
});

export default Revision;
