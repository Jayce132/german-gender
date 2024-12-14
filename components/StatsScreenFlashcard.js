import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const StatsScreenFlashcard = ({ word, initialScore, newScore }) => {
    const scoreDifference = newScore - initialScore;

    // Determine color based on the score difference
    const scoreColor = scoreDifference > 0
        ? colors.positiveScoreChangeColor
        : scoreDifference < 0
            ? colors.negativeScoreChangeColor
            : colors.neutralScoreChangeColor;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.row}>
                <Text style={styles.word}>{word}</Text>
                <Text style={[styles.score, { color: scoreColor }]}>{scoreDifference}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.cardBackgroundColor,
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '100%',
        alignItems: 'flex-start', // Align items to the left
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items vertically at the center
        width: '100%',
    },
    word: {
        fontSize: 24,
        fontWeight: '600', // Add boldness for emphasis
        color: colors.textColor,
        flex: 1,
        marginRight: 10, // Add some space between word and score
        marginLeft: 10,
    },
    score: {
        fontSize: 24,
        fontWeight: '600', // Match the emphasis on score
        color: colors.textColor,
        textAlign: 'right', // Align the score to the right side
        marginRight: 20,
    },
});

export default StatsScreenFlashcard;
