import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from "../styles/colors";

const UnderlineInput = ({
                            value,
                            onChangeText,
                            length,
                            editable = true,
                            autoFocus = false,
                            letterStatuses = [],
                        }) => {
    const blockWidth = 35; // Width per block including margins
    const totalWidth = length * blockWidth;

    return (
        <View style={[styles.inputContainer, { width: totalWidth }]}>
            <View style={styles.placeholderContainer}>
                {Array.from({ length }).map((_, index) => {
                    const letter = value[index] || '';
                    const status = letterStatuses[index];
                    const textStyle = [styles.placeholderText];
                    if (status === 'correct') {
                        textStyle.push(styles.correctLetter);
                    } else if (status === 'incorrect') {
                        textStyle.push(styles.incorrectLetter);
                    }
                    return (
                        <View key={index} style={styles.placeholderBlock}>
                            <Text style={textStyle}>{letter}</Text>
                        </View>
                    );
                })}
            </View>
            {editable && (
                <TextInput
                    style={styles.overlayTextInput}
                    value={value}
                    onChangeText={(text) => {
                        const limitedText = text.slice(0, length);
                        onChangeText(limitedText);
                    }}
                    placeholder=""
                    placeholderTextColor="transparent"
                    editable={editable}
                    autoFocus={autoFocus}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
    },
    placeholderContainer: {
        flexDirection: 'row',
    },
    placeholderBlock: {
        width: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#999',
        marginHorizontal: 5,
    },
    placeholderText: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'monospace',
    },
    overlayTextInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'transparent',
        fontSize: 32,
        letterSpacing: 15,
        fontFamily: 'monospace',
        textAlign: 'left',
    },
    correctLetter: {
        color: colors.successColor,
    },
    incorrectLetter: {
        color: colors.errorColor,
    },
});

export default UnderlineInput;
