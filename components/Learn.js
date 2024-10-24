import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import wordsData from '../data/wordsData';
import colors from '../styles/colors';

const Learn = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Combine all words into a single array and include the word type in each word object
    const allWords = Object.entries(wordsData).flatMap(([type, words]) =>
        words.map((word) => ({ ...word, type }))
    );

    const filteredWords = allWords.filter(
        (word) =>
            word.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
            word.english.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getLabelColor = (article, type) => {
        if (article) {
            switch (article.toLowerCase()) {
                case 'der':
                    return '#3573ee';
                case 'die':
                    return '#ff00dd';
                case 'das':
                    return '#00c938';
                default:
                    return colors.textColor;
            }
        } else {
            // Assign colors based on word type
            switch (type) {
                case 'verb':
                    return '#e67e22'; // Orange
                case 'adjective':
                    return '#9b59b6'; // Purple
                case 'adverb':
                    return '#e74c3c'; // Red
                default:
                    return colors.textColor;
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* Display article or word type */}
            <Text style={[styles.labelText, { color: getLabelColor(item.article, item.type) }]}>
                {item.article ? item.article : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
            <Text style={[styles.germanText, { color: getLabelColor(item.article, item.type) }]}>
                {item.german}
            </Text>
            <Text style={styles.englishText}>
                {item.article ? 'the ' : ''}
                {item.english}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search words..."
                placeholderTextColor={colors.textColor}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredWords}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.german}-${item.english}`}
                showsVerticalScrollIndicator={false}
            />
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
    card: {
        width: '100%',
        backgroundColor: colors.cardBackgroundColor,
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    labelText: {
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '400',
    },
    germanText: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold',
        color: colors.textColor,
    },
    englishText: {
        textAlign: 'right',
        fontSize: 22,
        color: colors.textColor,
    },
});

export default Learn;
