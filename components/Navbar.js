import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import colors from '../styles/colors';

const Navbar = ({ setComponent, selectedComponent, setComponentAfterStats }) => {
    const handleChangeComponent = (component) => {
        if (selectedComponent === 'Practice') {
            setComponentAfterStats(component);
            setComponent('StatsScreen');
        } else {
            setComponent(component);
        }
    };

    const navItems = [
        { label: 'Home', component: 'Home' },
        { label: 'Learn', component: 'Learn' },
        { label: 'Sentence Builder', component: 'SentenceBuilder' },
    ];

    // Filter out the current page
    const filteredNavItems = navItems.filter(
        (item) => item.component !== selectedComponent
    );

    return (
        <View style={styles.navbar}>
            <StatusBar backgroundColor={colors.buttonBackgroundColor} barStyle="light-content" />
            {filteredNavItems.map((item) => (
                <TouchableOpacity
                    key={item.component}
                    onPress={() => handleChangeComponent(item.component)}
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingTop: StatusBar.currentHeight || 10, // Adjust for the status bar height
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
