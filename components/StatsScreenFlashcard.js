import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../styles/colors';
import Icon from "react-native-vector-icons/FontAwesome";

const StatsScreenFlashcard = ({word, initialScore, newScore, newUnlock, completed}) => {
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
                {!newUnlock && !completed &&
                    <Text style={[styles.score, {color: scoreColor}]}>
                        {scoreDifference > 0 ? `+${scoreDifference}` : scoreDifference}
                    </Text>
                }
                {completed && <Icon name="trophy" size={24} color={colors.successColor} />}
                {newUnlock && <Icon name="unlock" size={24} color={colors.textColor} />}
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
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    word: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.textColor,
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    score: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.textColor,
        textAlign: 'right',
    },
});

export default StatsScreenFlashcard;
