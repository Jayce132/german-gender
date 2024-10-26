import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Flashcard from './Flashcard';
import CustomAlert from './CustomAlert';

const Revision = ({ words, onReady }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

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
        // Check if the user has seen all the words
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

    const currentWord = words[currentWordIndex];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {currentWord && <Flashcard item={currentWord} />}

                {/* German sentence with highlighted word */}
                {currentWord && (
                    <Text style={styles.sentence}>
                        Lorem ipsum <Text style={styles.highlight}>{currentWord.german}</Text> dolor sit amet,
                        consectetur adipiscing elit.
                    </Text>
                )}

                {/* English sentence with highlighted word */}
                {currentWord && (
                    <Text style={styles.sentence}>
                        Lorem ipsum <Text style={styles.highlight}>{currentWord.english}</Text> dolor sit amet,
                        consectetur adipiscing elit.
                    </Text>
                )}

                <TouchableOpacity onPress={handleReady} style={styles.readyButton}>
                    <Text style={styles.readyButtonText}>Ready</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.navigationContainer}>
                {/* Previous button, always visible */}
                <TouchableOpacity
                    onPress={handlePrevious}
                    style={[styles.navButton, currentWordIndex === 0 && styles.hiddenButton]}
                    disabled={currentWordIndex === 0}>
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>

                {/* Word counter in the middle */}
                {words.length > 0 && (
                    <Text style={styles.wordCounter}>
                        {currentWordIndex + 1} / {words.length}
                    </Text>
                )}

                {/* Next button, always visible */}
                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.navButton, currentWordIndex === words.length - 1 && styles.hiddenButton]}
                    disabled={currentWordIndex === words.length - 1}>
                    <Text
                        style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* Custom Alert Modal */}
            <CustomAlert
                visible={isAlertVisible}
                title="Warning"
                message="You have not seen all the words yet. Are you sure you want to continue?"
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
