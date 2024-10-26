import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const Flashcard = ({ item }) => {
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
            switch (type) {
                case 'verb':
                    return '#e67e22';
                case 'adjective':
                    return '#9b59b6';
                case 'adverb':
                    return '#e74c3c';
                default:
                    return colors.textColor;
            }
        }
    };

    return (
        <View style={styles.card}>
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
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardBackgroundColor,
        width: '100%',
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

export default Flashcard;