import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, View,
} from 'react-native';
import Navbar from './components/Navbar';
import Learn from './components/Learn';
import Practice from './components/Practice';
import SentenceBuilder from './components/SentenceBuilder';
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
            {/* Conditionally render Navbar only if selectedComponent is not 'Learn' */}
            {selectedComponent !== 'Learn' && (
                <Navbar setComponent={setSelectedComponent} />
            )}
            <View style={styles.mainContainer}>
                {selectedComponent === 'Home' && (
                    <Home
                        setNumWordsToPractice={setNumWordsToPractice}
                        setSelectedComponent={setSelectedComponent}
                        setWordType={setWordType}
                    />
                )}
                {selectedComponent === 'Learn' && <Learn setComponent={setSelectedComponent} />}
                {selectedComponent === 'Practice' && (
                    <Practice
                        numWordsToPractice={numWordsToPractice}
                        wordType={wordType}
                        setSelectedComponent={setSelectedComponent}
                    />
                )}
                {selectedComponent === 'SentenceBuilder' && (
                    <SentenceBuilder setSelectedComponent={setSelectedComponent} />
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
        paddingHorizontal: 0,
    },
});

export default App;
