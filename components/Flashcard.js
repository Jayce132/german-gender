// components/Flashcard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';

const Flashcard = ({item}) => {
    const {score} = item;

    const MAX_SCORE = 4;
    const MIN_SCORE = -4;

    const getLabelColor = (article, type) => {
        if (article) {
            switch (article.toLowerCase()) {
                case 'der':
                    return colors.highlightColor; // Light blue
                case 'die':
                    return colors.dieColor; // Hot pink
                case 'das':
                    return colors.successColor; // Green
                default:
                    return colors.textColor;
            }
        } else {
            switch (type.toLowerCase()) {
                case 'verb':
                    return colors.verbColor; // Orange
                case 'adjective':
                    return colors.adjectiveColor; // Purple
                case 'adverb':
                    return colors.errorColor; // Red
                default:
                    return colors.textColor;
            }
        }
    };

    // Calculate the progress percentage based on the score
    const getProgressPercentage = (score) => {
        if (score >= 0) {
            return (score / MAX_SCORE) * 100;
        } else {
            return (Math.abs(score) / Math.abs(MIN_SCORE)) * 100;
        }
    };

    const progressPercentage = getProgressPercentage(score);

    // Determine the color of the progress bar based on the score
    const progressColor = score >= 0 ? colors.successColor : colors.errorColor;

    return (
        <View style={styles.card}>
            {/* Card Content */}
            <Text style={[styles.labelText, {color: getLabelColor(item.article, item.type)}]}>
                {item.article
                    ? item.article
                    : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
            <Text style={[styles.germanText, {color: getLabelColor(item.article, item.type)}]}>
                {item.german}
            </Text>
            <Text style={styles.englishText}>
                {item.article ? 'the ' : ''}
                {item.english}
            </Text>

            {/* Progress Bar and Badge Container */}
            <View style={styles.progressContainer}>
                {/* Progress Badge */}
                <View style={[styles.progressBadge, {backgroundColor: progressColor}]}>
                    <Text style={styles.progressBadgeText}>{score}</Text>
                </View>
                {/* Progress Bar Container */}
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: `${progressPercentage}%`,
                                backgroundColor: progressColor,
                                left: score >= 0 ? 0 : null,
                                right: score < 0 ? 0 : null,
                            },
                        ]}
                    />
                </View>
            </View>
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
        // Shadows (iOS)
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // Elevation (Android)
        elevation: 5,
        position: 'relative',
    },
    labelText: {
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '400',
        // Color is now set dynamically
    },
    germanText: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold',
        // Color is now set dynamically
    },
    englishText: {
        textAlign: 'right',
        fontSize: 22,
        color: colors.textColor,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    progressBadge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    progressBadgeText: {
        color: colors.textColor,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
    },
    progressBarFill: {
        position: 'absolute',
        height: '100%',
        width: '0%',
    },
});

export default Flashcard;