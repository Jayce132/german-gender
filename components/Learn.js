import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import wordsData from '../data/wordsData';
import colors from '../styles/colors';

const Learn = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWords = wordsData.filter(word =>
        word.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.english.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getArticleColor = (article) => {
        switch (article.toLowerCase()) {
            case 'der':
                return '#3573ee';
            case 'die':
                return '#ff00dd';
            case 'das':
                return '#00c938';
            default:
                return 'black';
        }
    };

    const renderItem = ({item}) => (
        <View style={styles.card}>
            <Text style={[styles.articleText, {color: getArticleColor(item.article)}]}>
                {item.article}
            </Text>
            <Text style={[styles.germanText, {color: getArticleColor(item.article)}]}>
                {item.german}
            </Text>
            <Text style={styles.englishText}>the {item.english}</Text>
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
                keyExtractor={(item) => item.english}
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
        height: 200,
        backgroundColor: colors.cardBackgroundColor,
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    articleText: {
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '400',
    },
    germanText: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold',
    },
    englishText: {
        textAlign: 'right',
        fontSize: 22,
        color: colors.textColor,
    },
});

export default Learn;
