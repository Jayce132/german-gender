import React, {useEffect, useState} from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, View,
} from 'react-native';
import Navbar from './components/Navbar';
import Learn from './components/Learn';
import Practice from './components/Practice';
import SentenceBuilder from './components/SentenceBuilder';
import colors from './styles/colors';
import Home from './components/Home';
import {
    synchronizeUnlockedWords,
} from "./firebase/getUnlockedWords";
import StatsScreen from "./components/StatsScreen";

const App = () => {
    const [selectedComponent, setSelectedComponent] = useState('Home');
    const [numWordsToPractice, setNumWordsToPractice] = useState(5); // Default number of words
    const [wordType, setWordType] = useState('noun'); // Default word type
    // this state is used to determine which component to navigate to after the StatsScreen
    // the stats component will act as a stop before navigating to the next component
    const [componentAfterStats, setComponentAfterStats] = useState('Home');
    // used to pass the changes in word ratings from the Practice component to the StatsScreen component
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const initialize = async () => {
            synchronizeUnlockedWords()
        };

        initialize();
    }, []);

    return (
        <SafeAreaView style={styles.app}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.backgroundColor}
            />
            {/* Conditionally render Navbar only if selectedComponent is not 'Learn' */}
            {selectedComponent !== 'Learn' && (
                <Navbar
                    setComponent={setSelectedComponent}
                    selectedComponent={selectedComponent}
                    setComponentAfterStats={setComponentAfterStats}
                />
            )}
            <View style={styles.mainContainer}>
                {selectedComponent === 'Home' && (
                    <Home
                        setNumWordsToPractice={setNumWordsToPractice}
                        setSelectedComponent={setSelectedComponent}
                        setWordType={setWordType}
                    />
                )}
                {selectedComponent === 'Learn' && <Learn setComponent={setSelectedComponent}/>}
                {selectedComponent === 'Practice' && (
                    <Practice
                        numWordsToPractice={numWordsToPractice}
                        wordType={wordType}
                        setSelectedComponent={setSelectedComponent}
                        stats={stats}
                        setStats={setStats}
                    />
                )}
                {selectedComponent === 'SentenceBuilder' && (
                    <SentenceBuilder setSelectedComponent={setSelectedComponent}/>
                )}
                {selectedComponent === 'StatsScreen' && (
                    <StatsScreen
                        setSelectedComponent={setSelectedComponent}
                        componentAfterStats={componentAfterStats}
                        stats={stats}
                        setStats={setStats}
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
        paddingHorizontal: 0,
    },
});

export default App;
