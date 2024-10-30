import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import wordsData from '../data/wordsData';
import colors from '../styles/colors';
import Flashcard from './Flashcard';
import { getWordScore } from '../utils/storage';

const Learn = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allWords, setAllWords] = useState([]);
    const [selectedType, setSelectedType] = useState('noun');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWords = async () => {
            setLoading(true);

            // Flatten the wordsData and include type
            const flatWords = Object.entries(wordsData).flatMap(([type, words]) =>
                words.map(word => ({ ...word, type }))
            );

            // Fetch scores for each word and merge them
            const wordsWithScores = await Promise.all(
                flatWords.map(async word => {
                    const score = await getWordScore(word.type, word.german);
                    return { ...word, score };
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

    const renderItem = ({ item }) => <Flashcard item={item} />;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder={`Search ${selectedType}s...`}
                placeholderTextColor={colors.textColor}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.filterContainer}>
                {['noun', 'verb', 'adjective', 'adverb'].map(type => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.filterButton,
                            selectedType === type && styles.activeFilterButton,
                        ]}
                        onPress={() => setSelectedType(selectedType === type ? null : type)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedType === type && styles.activeFilterText,
                            ]}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={colors.highlightColor} style={styles.loadingIndicator} />
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
        padding: 20,
    },
    searchInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontWeight: '500',
        fontSize: 16,
        color: colors.textColor,
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: 8,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: colors.inputBackgroundColor,
    },
    activeFilterButton: {
        backgroundColor: colors.highlightColor,
    },
    filterText: {
        color: colors.textColor,
        fontSize: 14,
    },
    activeFilterText: {
        color: colors.textColor,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default Learn;
