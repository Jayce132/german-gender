import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import colors from "../styles/colors";
import {auth} from '../firebase/config';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {UserContext} from "../context/UserContext";

const AuthenticationPage = ({setSelectedComponent}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {setCurrentUserId} = useContext(UserContext);

    const handleSubmit = async () => {
        setErrorMessage('');
        if (email.trim() && password.trim()) {
            try {
                if (isSigningUp) {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    setCurrentUserId(userCredential.user.uid);
                } else {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    setCurrentUserId(userCredential.user.uid);
                }
                setSelectedComponent('Home');
            } catch (error) {
                console.log(error.code);
                setErrorMessage(handleErrorMessage(error.code));
            }
        } else {
            setErrorMessage('Please enter both email and password.');
        }
    };

    const handleErrorMessage = (code) => {
        switch (code) {
            case 'auth/invalid-email':
                return 'Invalid email address format.';
            case 'auth/invalid-credential':
                return 'Invalid credentials.';
            case 'auth/email-already-in-use':
                return 'Email already in use.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            default:
                return 'An error occurred.';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isSigningUp ? 'Sign Up' : 'Login'}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {isSigningUp ? 'Sign Up' : 'Login'}
                </Text>
            </TouchableOpacity>
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsSigningUp(!isSigningUp)}
            >
                <Text style={styles.toggleButtonText}>
                    {isSigningUp
                        ? 'Already have an account? Log in'
                        : "Don't have an account? Sign up"}
                </Text>
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
    errorText: {
        color: colors.errorColor || 'red', // Define a color in your styles/colors.js or use 'red'
        fontSize: 14,
        marginTop: 10,
    },
    toggleButton: {
        marginTop: 10,
    },
    toggleButtonText: {
        color: colors.textColor,
        fontSize: 14,
    },
});

export default AuthenticationPage;
