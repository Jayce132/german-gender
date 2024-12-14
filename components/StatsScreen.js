import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import StatsScreenFlashcard from './StatsScreenFlashcard'; // Import the new component
import colors from '../styles/colors';

const StatsScreen = ({ setSelectedComponent, componentAfterStats, stats }) => {
    const handleContinue = () => {
        setSelectedComponent(componentAfterStats);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Practice statistics</Text>

            {/* Words and Rating Titles as Column Headers */}
            <View style={styles.headerContainer}>
                <Text style={styles.columnTitle}>Words</Text>
                <Text style={styles.columnTitle}>Rating change</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {Object.keys(stats).map((key) => {
                    const stat = stats[key];
                    return (
                        <StatsScreenFlashcard
                            key={key}
                            word={key}
                            initialScore={stat.initialScore}
                            newScore={stat.newScore}
                        />
                    );
                })}
            </ScrollView>

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: colors.textColor,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    columnTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textColor,
        textAlign: 'center',
        flex: 1, // This makes both titles evenly spaced
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
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
