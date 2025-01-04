import React, {useContext} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import colors from '../styles/colors';
import {UserContext} from "../context/UserContext";

const Navbar = ({ setComponent, selectedComponent, setComponentAfterStats }) => {
    const { currentUserId, setCurrentUserId } = useContext(UserContext);

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
        { label: 'Login', component: 'AuthenticationPage' },
    ];

    // Filter out the current page
    const filteredNavItems = navItems.filter(
        (item) => item.component !== selectedComponent
    );

    if (currentUserId) {
        filteredNavItems.splice(-1, 1);
    }

    const handleLogout = () => {
        setCurrentUserId(null);
    }

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
            {currentUserId && (
                <TouchableOpacity onPress={handleLogout} style={styles.navButton}>
                    <Text style={styles.navButtonText}>Logout</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingTop: StatusBar.currentHeight || 10,
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