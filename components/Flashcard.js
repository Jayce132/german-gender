import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Flashcard = ({ item }) => {
    const { score, german, article, type, english } = item;

    const MAX_SCORE = 4;
    const MIN_SCORE = -4;
    const isScoreNull = score === null;

    // Returns color based on article or type
    const getLabelColor = (article, type) => {
        if (article) {
            const colorMap = {
                'der': colors.highlightColor,
                'die': colors.dieColor,
                'das': colors.successColor,
            };
            return colorMap[article.toLowerCase()] || colors.textColor;
        }

        const typeColorMap = {
            'verb': colors.verbColor,
            'adjective': colors.adjectiveColor,
            'adverb': colors.errorColor,
        };
        return typeColorMap[type.toLowerCase()] || colors.textColor;
    };

    // Calculate the progress percentage based on the score
    const getProgressPercentage = (score) => {
        if (score >= 0) return (score / MAX_SCORE) * 100;
        return (Math.abs(score) / Math.abs(MIN_SCORE)) * 100;
    };

    const progressPercentage = isScoreNull ? 0 : getProgressPercentage(score);
    const progressColor = score >= 0 ? colors.successColor : colors.errorColor;

    // Dynamic font size for German text
    const dynamicFontSize = Math.max(60 - german.length * 1.5, 20);
    const dynamicMarginVertical = Math.min(10 + german.length * 1.5, 30);

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: isScoreNull ? colors.disabledCardBackgroundColor : colors.cardBackgroundColor },
            ]}
        >
            {isScoreNull && (
                <View style={styles.lockOverlay}>
                    <Icon name="lock" size={150} color={colors.textColor} />
                </View>
            )}

            <Text style={[styles.labelText, { color: getLabelColor(article, type) }]}>
                {article || type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
            <Text
                style={[
                    styles.germanText,
                    {
                        color: getLabelColor(article, type),
                        fontSize: dynamicFontSize,
                        marginVertical: dynamicMarginVertical,
                    },
                ]}
            >
                {german}
            </Text>
            <Text style={styles.englishText}>
                {article ? 'the ' : ''}{english}
            </Text>

            <View style={[styles.progressContainer, isScoreNull && { justifyContent: 'center' }]}>
                {isScoreNull ? (
                    <Text style={styles.unlockText}>Full score on a word needed to unlock</Text>
                ) : (
                    <>
                        <View style={[styles.progressBadge, { backgroundColor: progressColor }]}>
                            <Text style={styles.progressBadgeText}>{score}</Text>
                        </View>
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
                    </>
                )}
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // Elevation (Android)
        elevation: 5,
        position: 'relative',
        overflow: 'hidden',
    },
    labelText: {
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '400',
    },
    germanText: {
        textAlign: 'center',
        fontWeight: 'bold',
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
    lockOverlay: {
        position: 'absolute',
        top: '50%',
        left: '60%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
        opacity: 0.5,
        zIndex: 1,
    },
    unlockText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.textColor,
    },
});

export default Flashcard;
