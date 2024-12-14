import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const StatsScreen = ({ setSelectedComponent, componentAfterStats }) => {
    const handleContinue = () => {
        setSelectedComponent(componentAfterStats);
    };

    return (
        <View style={styles.container}>
            <Text>test</Text>
            <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.backgroundColor,
    },
    continueButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default StatsScreen;