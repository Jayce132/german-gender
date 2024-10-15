import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import colors from '../styles/colors';

const FullList = ({
                      words, onSelectWord, currentSelectedWord, toggleFavorite,
                  }) => {
    return (<View style={styles.wordList}>
            <ScrollView>
                {words.map((word) => {
                    const isSelected = word.english === currentSelectedWord;
                    const itemStyles = [styles.wordItem];
                    const textStyles = [styles.wordItemText];

                    if (isSelected) {
                        itemStyles.push(styles.current);
                        textStyles.push(styles.currentText);
                    }
                    if (word.attemptStatus === 'correct') {
                        itemStyles.push(styles.correct);
                        textStyles.push(styles.statusText);
                    }
                    if (word.attemptStatus === 'incorrect') {
                        itemStyles.push(styles.incorrect);
                        textStyles.push(styles.statusText);
                    }

                    return (<TouchableOpacity
                            key={word.english}
                            style={itemStyles}
                            onPress={() => onSelectWord(word.english)}
                        >
                            <Text style={textStyles}>{word.english}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={styles.actionIcon}
                                    onPress={() => toggleFavorite(word.english)}
                                >
                                    <FontAwesome
                                        name={word.isFavorite ? 'heart' : 'heart-o'}
                                        size={20}
                                        color={colors.textColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>);
                })}
            </ScrollView>
        </View>);
};

const styles = StyleSheet.create({
    wordList: {
        flex: 1, backgroundColor: colors.buttonBackgroundColor, borderRadius: 8, padding: 10, margin: 5,
    }, wordItem: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: colors.backgroundColor,
        borderWidth: 1,
        borderColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, wordItemText: {
        color: colors.textColor,
    }, current: {
        borderColor: colors.highlightColor, borderWidth: 1, borderLeftWidth: 5, borderStyle: "solid",
    }, currentText: {
        color: colors.highlightColor,
    }, correct: {
        backgroundColor: colors.successColor,
    }, incorrect: {
        backgroundColor: colors.errorColor,
    }, statusText: {
        color: '#fff',
    }, actionIcon: {
        marginLeft: 15,
    }, actions: {
        flexDirection: 'row',
    },

});

export default FullList;
