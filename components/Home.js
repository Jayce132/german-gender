import React, {useState, useEffect} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView
} from 'react-native';
import colors from '../styles/colors';
import {getAllWords} from '../firebase/getAllWords';
import Flashcard from './Flashcard';

const Home = ({setNumWordsToPractice, setSelectedComponent, setWordType}) => {
    const [selectedType, setSelectedType] = useState(null);

    const typeDescriptions = {
        noun: 'A noun is a person, place, thing, or idea...',
        verb: 'A verb expresses an action, occurrence, or state...',
        adjective: 'An adjective describes or modifies a noun...',
        adverb: 'An adverb modifies verbs, adjectives, or other adverbs...',
        pronoun: 'A pronoun takes the place of a noun...',
        preposition: 'A preposition links a noun to another word...',
    };

    const wordTypes = Object.keys(typeDescriptions);
    const maximumWordsInPractice = 10;

    const handleStartPractice = () => {
        if (!selectedType) return;
        setNumWordsToPractice(maximumWordsInPractice);
        setWordType(selectedType);
        setSelectedComponent('Practice');
    };

    // Temporary words, will change this later
    const homeTypeExampleWords = {
        "noun": {"article": "das", "english": "year", "german": "Jahr", "score": 0, "type": "noun"},
        "verb": {"german": "sein", "english": "to be", "score": 0, "type": "verb"},
        "adjective" : {"german": "ganz", "english": "whole, entire", "score": 0, "type": "adjective"},
        "adverb" : { "german": "auch", "english": "also, too", "score": 0, "type": "adverb"},
        "pronoun" : {"german": "ich",  "english": "I", "score": 0, "type": "pronoun"},
        "preposition" : { "german": "in", "english": "in", "case": ["accusative", "dative"], "score": 0, "type": "preposition"},
    }


    const firstWord = homeTypeExampleWords[selectedType]

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Hello Guest</Text>
                    <Text style={styles.headerSubtitle}>
                        What do you want to practice today?
                    </Text>
                </View>

                {selectedType ? (
                    <View style={styles.singleTypeContainer}>
                        <TouchableOpacity style={[styles.typeButton, styles.selectedTypeButton]}>
                            <Text style={[styles.typeButtonText, styles.selectedTypeButtonText]}>
                                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.typeDescription}>{typeDescriptions[selectedType]}</Text>

                        {firstWord ? (
                            <View style={{marginTop: 10}}>
                                <Flashcard item={firstWord}/>
                            </View>
                        ) : (
                            <Text style={styles.noWordFound}>No {selectedType} word found.</Text>
                        )}

                        <TouchableOpacity onPress={() => setSelectedType(null)} style={styles.chooseAnotherButton}>
                            <Text style={styles.chooseAnotherButtonText}>Choose another</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Grid-like layout of word types
                    <View style={styles.allTypesContainer}>
                        {wordTypes.map((type) => (
                            <View key={type} style={styles.typeBlock}>
                                <TouchableOpacity style={styles.typeButton} onPress={() => setSelectedType(type)}>
                                    <Text style={styles.typeButtonText}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    style={[
                        styles.practiceButton,
                        !selectedType && {backgroundColor: '#555'},
                    ]}
                    onPress={handleStartPractice}
                    disabled={!selectedType}
                >
                    <Text style={styles.practiceButtonText}>Start Practice</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    mainContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    headerContainer: {
        backgroundColor: colors.buttonBackgroundColor,
        width: '100%',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        // Shadows
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 5,
    },
    singleTypeContainer: {
        width: '100%',
        marginVertical: 20,
    },
    allTypesContainer: {
        width: '100%',
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    typeBlock: {
        width: '40%',
        margin: 10,
    },
    typeButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        // Shadows
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
    },
    selectedTypeButton: {
        backgroundColor: colors.highlightColor,
        marginBottom: 10,
    },
    typeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    selectedTypeButtonText: {
        color: '#242424',
        fontWeight: 'bold',
    },
    typeDescription: {
        marginTop: 10,
        color: colors.textColor,
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
    },
    noWordFound: {
        marginTop: 8,
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    chooseAnotherButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: colors.buttonBackgroundColor,
        alignSelf: 'center',
    },
    chooseAnotherButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    practiceButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'center',
    },
    practiceButtonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Home;
