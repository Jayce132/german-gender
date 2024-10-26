import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import colors from '../styles/colors';

const CustomAlert = ({ visible, title, message, onCancel, onContinue }) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.alertContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onCancel} style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onContinue} style={[styles.button, styles.continueButton]}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.backgroundColor,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.textColor,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.textColor,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    continueButton: {
        backgroundColor: colors.buttonBackgroundColor,
        marginLeft: 10,
    },
    buttonText: {
        color: colors.textColor,
        fontSize: 16,
    },
});

export default CustomAlert;
