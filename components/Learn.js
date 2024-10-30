import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import wordsData from '../data/wordsData';
import colors from '../styles/colors';
import Flashcard from './Flashcard';
import LearnHeader from './LearnHeader';
import {getWordScore} from '../utils/storage';

const Learn = ({setComponent}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allWords, setAllWords] = useState([]);
    const [selectedType, setSelectedType] = useState('noun');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWords = async () => {
            setLoading(true);

            // Flatten the wordsData and include type
            const flatWords = Object.entries(wordsData).flatMap(([type, words]) =>
                words.map(word => ({...word, type}))
            );

            // Fetch scores for each word and merge them
            const wordsWithScores = await Promise.all(
                flatWords.map(async word => {
                    const score = await getWordScore(word.type, word.german);
                    return {...word, score};
                })
            );

            setAllWords(wordsWithScores);
            setLoading(false);
        };

        loadWords();
    }, []);

    const filteredWords = allWords.filter(word =>
        (selectedType === null || word.type === selectedType) &&
        (word.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
            word.english.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderItem = ({item}) => <Flashcard item={item}/>;

    return (
        <View style={styles.container}>
            <LearnHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                setComponent={setComponent}
            />
            {loading ? (
                <ActivityIndicator size="large" color={colors.highlightColor} style={styles.loadingIndicator}/>
            ) : (
                <FlatList
                    data={filteredWords}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.german}-${item.english}`}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: 10,
        paddingHorizontal: 20,
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default Learn;
