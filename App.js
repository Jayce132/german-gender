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
import AuthenticationPage from "./components/AuthenticationPage";
import {UserProvider} from './context/UserContext';

const App = () => {
    const [selectedComponent, setSelectedComponent] = useState('Home');
    const [numWordsToPractice, setNumWordsToPractice] = useState(5); // Default number of words
    const [wordType, setWordType] = useState('noun'); // Default word type
    const [componentAfterStats, setComponentAfterStats] = useState('Home');
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const initialize = async () => {
            synchronizeUnlockedWords()
        };
        initialize();
    }, []);

    return (
        <UserProvider>
            <SafeAreaView style={styles.app}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.backgroundColor}
                />
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
                    {selectedComponent === 'AuthenticationPage' && (
                        <AuthenticationPage
                            setSelectedComponent={setSelectedComponent}
                        />
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
        </UserProvider>
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