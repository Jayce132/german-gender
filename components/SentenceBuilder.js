import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import colors from '../styles/colors';
import highlightSentence from "../utils/highlightSentence";
import * as Speech from 'expo-speech';
import {getUnlockedWords} from "../firebase/getUnlockedWords";

const SentenceBuilder = () => {
    const [selectedWordTypes, setSelectedWordTypes] = useState([]);
    const [selectedWords, setSelectedWords] = useState({});
    const [sentence, setSentence] = useState('');
    const [translation, setTranslation] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedSentence, setHighlightedSentence] = useState([]); // State for highlighted German sentence
    const [wordsData, setWordsData] = useState({ noun: [], verb: [], adjective: [], adverb: [] });

    const wordTypes = ['noun', 'verb', 'adjective', 'adverb'];

    useEffect(() => {
        const fetchWords = async () => {
            setWordsData( await getUnlockedWords());
        }

        fetchWords()
    }, []);

    // Automatically determine difficulty level based on number of word types selected
    const getDifficultyLevel = () => {
        const count = selectedWordTypes.length;
        if (count <= 1) return 'A1';
        if (count === 2) return 'A2';
        if (count === 3) return 'B1 (easier)';
        if (count >= 4) return 'B1 (advanced)';
        return 'A1';
    };

    const handleWordTypeToggle = (type) => {
        setSelectedWordTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
        // Reset selected word for that type when toggling
        setSelectedWords((prev) => {
            const newSelectedWords = { ...prev };
            delete newSelectedWords[type];
            return newSelectedWords;
        });
        // Clear previous explanation and highlighted sentence
        setExplanation('');
        setSentence('');
        setTranslation('');
        setHighlightedSentence([]);
    };

    const handleWordSelect = (type, word) => {
        setSelectedWords((prev) => ({
            ...prev,
            [type]: word,
        }));
        // Clear previous explanation and highlighted sentence
        setExplanation('');
        setSentence('');
        setTranslation('');
        setHighlightedSentence([]);
    };

    // Function to generate the sentence
    const generateSentence = async () => {
        const difficultyLevel = getDifficultyLevel();

        // Construct the prompt based on selected words and difficulty level
        let prompt = `Create a German sentence at the ${difficultyLevel} level that includes `;
        const wordTypePrompts = [];

        selectedWordTypes.forEach((type) => {
            const word = selectedWords[type];
            if (word) {
                if (type === 'noun') {
                    wordTypePrompts.push(`the noun "${word.article} ${word.german}"`);
                } else {
                    wordTypePrompts.push(`the ${type} "${word.german}"`);
                }
            }
        });

        prompt += wordTypePrompts.join(' and ') + '.';

        if (difficultyLevel === 'B1 (advanced)') {
            prompt += ' You are allowed to use a subordinate clause or the genitive case if needed.';
        } else if (difficultyLevel === 'B1 (easier)') {
            prompt += ' Use compound sentences with connectors like "und" or "aber". Do not use subordinate clauses or the genitive case.';
        } else {
            prompt += ' Do not use subordinate clauses or the genitive case.';
        }

        // Add instruction to provide English translation
        prompt += ' Provide the German sentence first, and then on a new line, provide the English translation starting with "Translation: ".';

        setIsLoading(true);

        try {
            // Make API call to OpenAI to generate the sentence
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: prompt }],
                }),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const fullResponse = data.choices[0].message.content.trim();
                // Split the response to get the German sentence and the translation
                const [germanSentence, translationText] = fullResponse.split('Translation: ');
                const germanText = germanSentence.trim();
                const translationTextTrimmed = translationText ? translationText.trim() : '';

                setSentence(germanText);
                setTranslation(translationTextTrimmed);

                // Highlight the German sentence
                const highlighted = highlightSentence(germanText, selectedWords);
                setHighlightedSentence(highlighted);

                // Now, make another API call to get the explanation
                await generateExplanation(germanText);
            } else {
                setSentence('No sentence was generated. Please try again.');
                setTranslation('');
                setExplanation('');
                setHighlightedSentence([]);
            }
        } catch (error) {
            console.error('Error generating sentence:', error);
            setSentence('An error occurred while generating the sentence.');
            setTranslation('');
            setExplanation('');
            setHighlightedSentence([]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateExplanation = async (germanSentence) => {
        // Construct the prompt for explanation
        let explanationPrompt = `When I provide a German sentence, explain any grammatical rules or concepts that might be new or challenging for an A1 level learner. Focus only on deviations from basic sentence structures that a beginner might find confusing. Provide brief explanations.

Use the following format:

Rule: [Brief explanation]

Examples:

Rule: 'kann' is a modal verb, so the main verb 'fahren' moves to the end in its infinitive form.

Rule: The accusative case is used for direct objects, so 'der Ball' changes to 'den Ball'. Masculine nouns change their article from 'der' to 'den' in the accusative case.

Rule: The verb 'sehen' is irregular, meaning its stem changes when conjugated (e.g., 'sehen' → 'sehe/siehst/sieht').

Now, analyze the following sentence and provide the rule(s) that apply:

"${germanSentence}"`;

        try {
            // Make API call to OpenAI to get the explanation
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Use your actual API key here
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: explanationPrompt }],
                    temperature: 0.5, // Adjust if necessary
                }),
            });

            const data = await response.json();

            if (data.error) {
                console.error('OpenAI API Error:', data.error);
                setExplanation('An error occurred while generating the explanation.');
                return;
            }

            if (data.choices && data.choices.length > 0) {
                const explanationText = data.choices[0].message.content.trim();
                console.log('Explanation:', explanationText);
                setExplanation(explanationText);
            } else {
                setExplanation('No explanation was generated. Please try again.');
            }
        } catch (error) {
            console.error('Error generating explanation:', error);
            setExplanation('An error occurred while generating the explanation.');
        }
    };

    // Function to speak the German sentence
    const speakSentence = () => {
        if (sentence) {
            // Stop any ongoing speech before starting a new one
            Speech.stop();

            // Configure speech options
            const options = {
                language: 'de-DE', // German language
                pitch: 1.0,
                rate: 1.0,
            };

            // Speak the German sentence
            Speech.speak(sentence, options, (error) => {
                if (error) {
                    Alert.alert('Error', 'Failed to speak the sentence.');
                    console.error('Speech.speak error:', error);
                } else {
                    console.log('Speech.speak initiated successfully.');
                }
            });
        }
    };


    useEffect(() => {
        if (sentence) {
            speakSentence();
        }

        // Cleanup function
        return () => {
            Speech.stop();
        };
    }, [sentence]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sentence Builder</Text>

            {/* Word Type Selection */}
            <Text style={styles.subtitle}>Select Word Types:</Text>
            <View style={styles.optionsContainer}>
                {wordTypes.map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.optionButton,
                            selectedWordTypes.includes(type) && styles.selectedOptionButton,
                        ]}
                        onPress={() => handleWordTypeToggle(type)}
                    >
                        <Text
                            style={[
                                styles.optionButtonText,
                                selectedWordTypes.includes(type) && styles.selectedOptionButtonText,
                            ]}
                        >
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Word Selection */}
            <ScrollView style={styles.wordSelectionScroll} contentContainerStyle={{ paddingBottom: 20 }}>
                {selectedWordTypes.map((type) => (
                    <View key={type} style={styles.wordSelectionContainer}>
                        <Text style={styles.subtitle}>Select a {type}:</Text>
                        <View style={styles.wordsContainer}>
                            {wordsData[type].map((word) => (
                                <TouchableOpacity
                                    key={word.german}
                                    style={[
                                        styles.wordButton,
                                        selectedWords[type]?.german === word.german && styles.selectedWordButton,
                                    ]}
                                    onPress={() => handleWordSelect(type, word)}
                                >
                                    <Text
                                        style={[
                                            styles.wordButtonText,
                                            selectedWords[type]?.german === word.german && styles.selectedWordButtonText,
                                        ]}
                                    >
                                        {word.german}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Generate Sentence Button */}
            <TouchableOpacity
                style={[
                    styles.generateButton,
                    (isLoading || selectedWordTypes.some((type) => !selectedWords[type])) &&
                    styles.disabledButton,
                ]}
                onPress={generateSentence}
                disabled={isLoading || selectedWordTypes.some((type) => !selectedWords[type])}
            >
                <Text style={styles.generateButtonText}>Generate Sentence</Text>
            </TouchableOpacity>

            {/* Loading Indicator */}
            {isLoading && <ActivityIndicator size="large" color={colors.highlightColor} />}

            {/* Display Generated Sentence and Translation */}
            {sentence !== '' && (
                <View style={styles.sentenceContainer}>
                    <Text style={styles.sentence}>
                        {highlightedSentence.length > 0
                            ? highlightedSentence.map((element, index) => (
                                <React.Fragment key={index}>{element}</React.Fragment>
                            ))
                            : sentence}
                    </Text>
                    {translation !== '' && (
                        <Text style={styles.translation}>Translation: {translation}</Text>
                    )}
                </View>
            )}

            {/* Explanation Text Box */}
            {explanation !== '' && (
                <ScrollView style={styles.explanationContainer}>
                    <Text style={styles.explanationTitle}>Explanation:</Text>
                    <Text style={styles.explanationText}>{explanation}</Text>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        color: colors.textColor,
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        color: colors.textColor,
        marginVertical: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    optionButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin: 5,
    },
    selectedOptionButton: {
        backgroundColor: colors.highlightColor,
    },
    optionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedOptionButtonText: {
        color: '#242424',
        fontWeight: 'bold',
    },
    wordSelectionScroll: {
        flex: 1,
        marginTop: 10,
    },
    wordSelectionContainer: {
        marginBottom: 15,
    },
    wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    wordButton: {
        backgroundColor: colors.cardBackgroundColor,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        margin: 5,
    },
    selectedWordButton: {
        backgroundColor: colors.highlightColor,
    },
    wordButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    selectedWordButtonText: {
        color: '#242424',
        fontWeight: 'bold',
    },
    generateButton: {
        backgroundColor: colors.successColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignSelf: 'center',
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    sentenceContainer: {
        backgroundColor: colors.cardBackgroundColor,
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    sentence: {
        color: colors.textColor,
        fontSize: 18,
        marginBottom: 10,
    },
    translation: {
        color: colors.textColor,
        fontSize: 16,
        fontStyle: 'italic',
    },
    explanationContainer: {
        backgroundColor: colors.cardBackgroundColor,
        padding: 5,
        borderRadius: 8,
        marginVertical: 10,
    },
    explanationTitle: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    explanationText: {
        color: colors.textColor,
        fontSize: 16,
    },
});

export default SentenceBuilder;
