import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, View,
} from 'react-native';
import Navbar from './components/Navbar';
import Learn from './components/Learn';
import Practice from './components/Practice';
import colors from './styles/colors';
import Home from './components/Home';

const App = () => {
    const [selectedComponent, setSelectedComponent] = useState('Home');
    const [numWordsToPractice, setNumWordsToPractice] = useState(5); // Default number of words
    const [wordType, setWordType] = useState('noun'); // Default word type

    return (
        <SafeAreaView style={styles.app}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.backgroundColor}
            />
            <Navbar setComponent={setSelectedComponent} />
            <View style={styles.mainContainer}>
                {selectedComponent === 'Home' && (
                    <Home
                        setNumWordsToPractice={setNumWordsToPractice}
                        setSelectedComponent={setSelectedComponent}
                        setWordType={setWordType}
                    />
                )}
                {selectedComponent === 'Learn' && <Learn />}
                {selectedComponent === 'Practice' && (
                    <Practice
                        numWordsToPractice={numWordsToPractice}
                        wordType={wordType}
                        setSelectedComponent={setSelectedComponent}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 10,
    },
});

export default App;
