import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../styles/colors';

const Navbar = ({setComponent}) => {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => setComponent('Home')} style={styles.titleContainer}>
                <Text style={styles.navbarTitle}>Learn German</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setComponent('Learn')}
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Learn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setComponent('Practice')}
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Practice</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        backgroundColor: colors.backgroundColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    titleContainer: {
        flex: 1,
    },
    navbarTitle: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    navButton: {
        marginHorizontal: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    navButtonText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default Navbar;
