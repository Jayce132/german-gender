import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import colors from "../styles/colors";
import {createUser, exists} from '../firebase/user';
import {UserContext} from "../context/UserContext";

const AuthenticationPage = ({setSelectedComponent}) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {setCurrentUserId} = useContext(UserContext);

    const handleSubmit = async () => {
        if (name.trim()) {
            setLoading(true);
            try {
                if (!await exists(name)) {
                    await createUser(name);
                }
                setCurrentUserId(name);
                setSelectedComponent('Home');
            } catch (error) {
                Alert.alert('Error creating user:', error.message);
            } finally {
                setLoading(false);
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
                editable={!loading}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                    <>
                        <ActivityIndicator size="small" color="#fff"/>
                        <Text style={styles.buttonText}>  Creating your account...</Text>
                    </>
                ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                )}
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.textColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AuthenticationPage;