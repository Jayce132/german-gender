import React, {useContext, useEffect, useState} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import colors from '../styles/colors';
import Flashcard from './Flashcard';
import {UserContext} from "../context/UserContext";
import {getUsername} from "../firebase/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({setNumWordsToPractice, setSelectedComponent, setWordType}) => {
    const [selectedType, setSelectedType] = useState(null);
    const {currentUserId} = useContext(UserContext);
    const [username, setUsername] = useState('');

    // used async storage to store the username so that there won't be a delay in loading the username
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                if (currentUserId) {
                    // try to get the username from AsyncStorage first
                    const storedUsername = await AsyncStorage.getItem('username');
                    if (storedUsername) {
                        setUsername(storedUsername);
                    } else {
                        // fetch from Firebase if not in AsyncStorage
                        const fetchedUsername = await getUsername(currentUserId);
                        setUsername(fetchedUsername);
                        await AsyncStorage.setItem('username', fetchedUsername);
                    }
                } else {
                    // set username to "Guest" if no currentUserId
                    setUsername('Guest');
                    await AsyncStorage.removeItem('username');
                }
            } catch (error) {
                console.error('Error fetching username:', error);
                setUsername('Guest');
            }
        };
        fetchUsername();
    }, [currentUserId]);

    const typeDescriptions = {
        noun: 'A noun is a person, place, thing, or idea',
        verb: 'A verb expresses an action, occurrence, or state',
        adjective: 'An adjective describes or modifies a noun',
        adverb: 'An adverb modifies verbs, adjectives, or other adverbs',
        pronoun: 'A pronoun takes the place of a noun',
        preposition: 'A preposition links a noun to another word',
    };

    const homeTypeExampleWords = {
        noun: [
            {article: 'das', english: 'year', german: 'Jahr', score: "hidden", type: 'noun'},
            {article: 'die', english: 'woman', german: 'Frau', score: "hidden", type: 'noun'},
            {article: 'der', english: 'man', german: 'Mann', score: "hidden", type: 'noun'},
        ],
        verb: [
            {german: 'machen', english: 'to do/make', score: "hidden", type: 'verb', subtype: 'Regular'},
            {german: 'können', english: 'can', score: "hidden", type: 'verb', subtype: 'Modal'},
            {german: 'sein', english: 'to be', score: "hidden", type: 'verb', subtype: 'Irregular'},
        ],
        adjective: [
            {german: 'ganz', english: 'whole, entire', score: "hidden", type: 'adjective'},
            {german: 'groß', english: 'big, large', score: "hidden", type: 'adjective'},
            {german: 'klein', english: 'small, little', score: "hidden", type: 'adjective'},
        ],
        adverb: [
            {german: 'auch', english: 'also, too', score: "hidden", type: 'adverb'},
            {german: 'sehr', english: 'very', score: "hidden", type: 'adverb'},
            {german: 'immer', english: 'always', score: "hidden", type: 'adverb'},
        ],
        pronoun: [
            {german: 'ich', english: 'I', score: "hidden", type: 'pronoun'},
            {german: 'du', english: 'you', score: "hidden", type: 'pronoun'},
            {german: 'er', english: 'he', score: "hidden", type: 'pronoun'},
        ],
        preposition: [
            {german: 'in', english: 'in', case: ['accusative', 'dative'], score: "hidden", type: 'preposition'},
            {german: 'für', english: 'for', case: ['accusative'], score: "hidden", type: 'preposition'},
            {german: 'mit', english: 'with', case: ['dative'], score: "hidden", type: 'preposition'},
        ],
    };

    const getRandomWord = (type) => {
        const words = homeTypeExampleWords[type];
        if (!words) return null;
        return words[Math.floor(Math.random() * words.length)];
    };

    const selectedWord = selectedType ? getRandomWord(selectedType) : null;

    const getSecondaryDescription = (word) => {
        if (!word) return null;

        if (word.type === 'noun') {
            if (word.article.includes('der')) {
                return 'Der article is used for masculine nouns.';
            }
            if (word.article.includes('die')) {
                return 'Die article is used for feminine nouns.';
            }
            if (word.article.includes('das')) {
                return 'Das article is used for neuter nouns.';
            }
        }

        if (word.type === 'verb') {
            if (word.subtype === 'Modal') {
                return 'Modal verbs express necessity or possibility and have unique conjugation patterns, they move the main verb to the end of the sentence.';
            }
            if (word.subtype === 'Irregular') {
                return 'An irregular verb does not follow standard conjugation patterns and often requires memorization for proper usage.';
            }
            if (word.subtype === 'Regular') {
                return 'A regular verb follows predictable conjugation patterns, making it easier to learn and use.';
            }
        }

        if (word.type === 'preposition') {
            if (word.case.includes('accusative') && word.case.includes('dative')) {
                return 'Some prepositions can take either the accusative (movement) or dative (location) case.';
            }
            if (word.case.includes('accusative')) {
                return 'An accusative preposition indicates direction or movement.';
            }
            if (word.case.includes('dative')) {
                return 'A dative preposition indicates location or an indirect object.';
            }
        }

        return null;
    };

    const handleStartPractice = () => {
        if (!selectedType) return;
        setNumWordsToPractice(10);
        setWordType(selectedType);
        setSelectedComponent('Practice');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                {/* Header Section */}
                {!selectedType ?
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Hello {username}</Text>
                        <Text style={styles.headerSubtitle}>
                            What do you want to practice today?
                        </Text>
                    </View> : <></>
                }

                {selectedType ? (
                    <View style={styles.singleTypeContainer}>
                        <Text style={styles.typeDescription}>{typeDescriptions[selectedType]}</Text>

                        {selectedWord && (
                            <View style={{marginTop: 10}}>
                                <Flashcard item={selectedWord}/>
                                <Text style={styles.secondaryDescription}>
                                    {getSecondaryDescription(selectedWord)}
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity onPress={() => setSelectedType(null)} style={styles.chooseAnotherButton}>
                            <Text style={styles.chooseAnotherButtonText}>Go back</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Grid-like layout of word types
                    <View style={styles.allTypesContainer}>
                        {Object.keys(typeDescriptions).map((type) => (
                            <View key={type} style={styles.typeBlock}>
                                <TouchableOpacity
                                    style={styles.typeButton}
                                    onPress={() => setSelectedType(type)}
                                >
                                    <Text style={styles.typeButtonText}>
                                        {type.charAt(0).toUpperCase() + type.slice(1) + "s"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    style={[
                        styles.practiceButton,
                        !selectedType && {display: 'none'}
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
        marginTop: 50,
        alignItems: 'center',
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
    secondaryDescription: {
        marginTop: 10,
        color: colors.textColor,
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    chooseAnotherButton: {
        marginTop: 50,
        marginBottom: 100,
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
