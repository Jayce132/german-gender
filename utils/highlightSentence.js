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
            case 'pronoun':
                return colors.pronounColor; // Light blue
            case 'preposition':
                return colors.prepositionColor; // Green
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

        // Include all forms of the word
        if (word.forms) {
            word.forms.forEach((formObj) => {
                const form = formObj.form.toLowerCase();
                wordForms[form] = { type, article: word.article || null };
            });
        }
    }

    const getNextWordToken = (tokens, currentIndex) => {
        for (let i = currentIndex + 1; i < tokens.length; i++) {
            const nextToken = tokens[i];
            if (/\w/.test(nextToken)) {
                return { token: nextToken, index: i };
            }
        }
        return null;
    };

    let articleHighlighted = false;

    // Now, go through the tokens and wrap them with Text components
    return tokens.map((token, index) => {
        const trimmedToken = token.trim();
        const lowerToken = trimmedToken.toLowerCase();

        let color = colors.textColor;

        // Check if the token is a selected word or its form
        if (wordForms[lowerToken] && trimmedToken.length > 0) {
            const { type, article } = wordForms[lowerToken];
            color = getLabelColor(article, type);
        }
        // Check if the token is the article associated with the selected noun
        else if (!articleHighlighted) {
            for (const [type, word] of Object.entries(selectedWords)) {
                if (type === 'noun' && word.article && word.article.toLowerCase() === lowerToken) {
                    // Get the next word token (skip spaces/punctuation)
                    const nextWord = getNextWordToken(tokens, index);
                    if (nextWord) {
                        const nextTokenTrimmed = nextWord.token.trim().toLowerCase();
                        if (
                            word.german.toLowerCase() === nextTokenTrimmed ||
                            (word.forms && word.forms.some(formObj => formObj.form.toLowerCase() === nextTokenTrimmed))
                        ) {
                            color = getLabelColor(word.article, 'article');
                            articleHighlighted = true;
                            break;
                        }
                    }
                }
            }
        }

        return (
            <Text key={index} style={{ color }}>
                {token}
            </Text>
        );
    });
};

export default highlightSentence;
