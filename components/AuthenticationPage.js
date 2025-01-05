import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import colors from "../styles/colors";
import {auth} from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import {UserContext} from "../context/UserContext";
import {createUser} from "../firebase/user";

const AuthenticationPage = ({setSelectedComponent}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const {setCurrentUserId} = useContext(UserContext);

    const handleSubmit = async () => {
        setErrorMessage('');
        if (email.trim() && password.trim()) {
            setIsLoading(true);
            try {
                const signInMethods = await fetchSignInMethodsForEmail(auth, email);

                if (signInMethods.length === 0 && !isNewUser) {
                    // no account exists with this email
                    setIsNewUser(true);
                } else if (isNewUser) {
                    // create a new user
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    await createUser(userCredential.user.uid, username);
                    setCurrentUserId(userCredential.user.uid);
                    setSelectedComponent('Home');
                } else {
                    // attempt to log in
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    setCurrentUserId(userCredential.user.uid);
                    setSelectedComponent('Home');
                }
            } catch (error) {
                console.log(error.code);
                setErrorMessage(handleErrorMessage(error.code));
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrorMessage('Please enter both email and password.');
        }
    };

    const handleErrorMessage = (code) => {
        switch (code) {
            case 'auth/invalid-email':
                return 'Invalid email address format.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/email-already-in-use':
                return 'Email already in use.';
            default:
                return 'An error occurred.';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isNewUser ? 'Who are you?' : 'Welcome back!'}
            </Text>
            <Text style={styles.infoText}>
                {isNewUser && `No account found for ${email}.\nEnter a username to sign up.`}
            </Text>
            {isNewUser && (
                <TextInput
                    style={styles.input}
                    placeholder="What's your username?"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={(text) => setUsername(text.replace(/\n/g, ''))}
                    autoCapitalize="none"
                />
            )}
            {!isNewUser && <TextInput
                style={styles.input}
                placeholder="What's your email?"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={(text) => setEmail(text.replace(/\n/g, ''))}
                keyboardType="email-address"
                autoCapitalize="none"
            />}
            {!isNewUser && <TextInput
                style={styles.input}
                placeholder={isNewUser ? "What should your password be?" : "What's your password?"}
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={(text) => setPassword(text.replace(/\n/g, ''))}
                autoCapitalize="none"
                secureTextEntry
            />}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.textColor}/>
                    <Text style={styles.loadingText}>
                        {isNewUser ? 'Creating your account...' : 'Logging in...'}
                    </Text>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.marginRight]} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            {isNewUser ? 'Sign Up' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                    {isNewUser && (
                        <TouchableOpacity style={styles.button} onPress={() => setIsNewUser(false)}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
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
        fontSize: 30,
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
        color: colors.errorColor || 'red',
        fontSize: 14,
        marginTop: 10,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingText: {
        marginLeft: 10,
        color: colors.textColor,
        fontSize: 16,
    },
    infoText: {
        color: colors.textColor,
        fontSize: 14,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
    },
    marginRight: {
        marginRight: 10,
    }
});

export default AuthenticationPage;
