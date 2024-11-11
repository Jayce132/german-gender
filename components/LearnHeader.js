import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const LearnHeader = ({ searchQuery, setSearchQuery, selectedType, setSelectedType, setComponent }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.homeSearchContainer}>
                <TouchableOpacity onPress={() => setComponent('Home')}>
                    <Text style={styles.navbarTitle}>Home</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Search ${selectedType || 'words'}...`}
                    placeholderTextColor={colors.textColor}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <View style={styles.filterContainer}>
                {['noun', 'verb', 'adjective', 'adverb'].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.filterButton,
                            selectedType === type && styles.activeFilterButton,
                        ]}
                        onPress={() => setSelectedType(type)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedType === type && styles.activeFilterText,
                            ]}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
    },
    homeSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    navbarTitle: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: colors.textColor,
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: 8,
        marginLeft: 15,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterButton: {
        width: '23%', // Ensures each button takes up roughly equal space in a row of 4
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: colors.inputBackgroundColor,
        alignItems: 'center',
    },
    activeFilterButton: {
        backgroundColor: colors.highlightColor,
    },
    filterText: {
        color: colors.textColor,
        fontSize: 14,
    },
    activeFilterText: {
        color: colors.textColor,
        fontWeight: 'bold',
    },
});

export default LearnHeader;