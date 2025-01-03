import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import colors from "../styles/colors";
import { createUser } from '../firebase/user';

const AuthenticationPage = ({setSelectedComponent, setCurrentUserId}) => {
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        if (name.trim()) {
            try {
                await createUser(name);
                setCurrentUserId(name);
                setSelectedComponent('Home');
            } catch (error) {
                Alert.alert('Error creating user:', error.message);
            }
        } else {
            Alert.alert('Please enter your name.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What's your name?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.textColor,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: colors.inputBackgroundColor,
        color: colors.textColor,
    },
    button: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default AuthenticationPage;
