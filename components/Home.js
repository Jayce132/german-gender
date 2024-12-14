import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const Home = ({ setNumWordsToPractice, setSelectedComponent, setWordType }) => {
    const [selectedType, setSelectedType] = useState('noun');
    const maximumWordsInPractice = 10;

    const handleStartPractice = () => {
        setNumWordsToPractice(maximumWordsInPractice);
        setWordType(selectedType);
        setSelectedComponent('Practice');
    };

    const wordTypes = ['noun', 'verb', 'adjective', 'adverb'];

    return (
        <View style={styles.home}>
            <Text style={styles.title}>Choose the number of</Text>

            <View style={styles.typeContainer}>
                {wordTypes.map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typeButton,
                            selectedType === type && styles.selectedTypeButton,
                        ]}
                        onPress={() => setSelectedType(type)}
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                selectedType === type && styles.selectedTypeButtonText,
                            ]}
                        >
                            {type}s
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.PracticeButton}
                onPress={() => handleStartPractice()}
            >
                <Text style={styles.PracticeButtonText}>Start practice</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.backgroundColor,
    },
    title: {
        fontSize: 24,
        color: colors.textColor,
        marginVertical: 10,
    },
    typeContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    typeButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    selectedTypeButton: {
        backgroundColor: colors.highlightColor,
    },
    typeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedTypeButtonText: {
        color: '#242424',
        fontWeight: 'bold',
    },
    PracticeButton: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginVertical: 30,
    },
    PracticeButtonText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Home;
