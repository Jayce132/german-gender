import React from 'react';
import { Text } from 'react-native';
import colors from '../styles/colors';

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

const highlightSentence = (sentence, selectedWords) => {
    // Tokenize the sentence into words and non-word characters (spaces, punctuation)
    const tokens = sentence.match(/([\wäöüßÄÖÜ]+|[^\wäöüßÄÖÜ]+)/g);

    const wordForms = {};
    // Build a mapping of words to their types and articles
    for (const [type, word] of Object.entries(selectedWords)) {
        // Add the base word to the mapping
        wordForms[word.german.toLowerCase()] = { type, article: word.article || null };

        // If the word is a noun, also add the article separately
        if (type === 'noun' && word.article) {
            wordForms[word.article.toLowerCase()] = { type: 'article', article: word.article };
        }

        // Include all forms of the word
        if (word.forms) {
            word.forms.forEach((formObj) => {
                const form = formObj.form.toLowerCase();
                wordForms[form] = { type, article: word.article || null };
            });
        }
    }

    // Now, go through the tokens and wrap them with Text components
    return tokens.map((token, index) => {
        const trimmedToken = token.trim();
        const lowerToken = trimmedToken.toLowerCase();
        const wordInfo = wordForms[lowerToken];

        if (wordInfo && trimmedToken.length > 0) {
            const { type, article } = wordInfo;
            const color = getLabelColor(article, type);

            return (
                <Text key={index} style={{ color }}>
                    {token}
                </Text>
            );
        } else {
            // For spaces and punctuation, or tokens not in selected words, use default color
            return (
                <Text key={index} style={{ color: colors.textColor }}>
                    {token}
                </Text>
            );
        }
    });
};

export default highlightSentence;
