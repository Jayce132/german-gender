import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const Navbar = ({ setComponent, selectedComponent, setComponentAfterStats }) => {
    const handleChangeComponent = (component) => {
        if (selectedComponent === 'Practice') {
            setComponentAfterStats(component);
            setComponent('StatsScreen');
        } else {
            setComponent(component);
        }
    }

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => handleChangeComponent('Home')} style={styles.navButton}>
                <Text style={styles.navButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChangeComponent('Learn')} style={styles.navButton}>
                <Text style={styles.navButtonText}>Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChangeComponent('SentenceBuilder')} style={styles.navButton}>
                <Text style={styles.navButtonText}>Sentence Builder</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
    },
    navButton: {
        paddingHorizontal: 10,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Navbar;
