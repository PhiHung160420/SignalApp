import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, View, Text, StyleSheet } from "react-native";
import { Input, Image, Button } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
        });
    }, [navigation]);

    const handerRegister = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.update({
                    displayName: name,
                    photoURL:
                        imageUrl ||
                        "https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720/76729750.jpg",
                });
            })
            .catch((err) => alert(err.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Register</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
                <Input
                    placeholder="Email"
                    type="text"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <Input
                    placeholder="Password"
                    type="text"
                    secureTextEntry
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
                <Input
                    placeholder="Profile picture URL (optinal)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(val) => setImageUrl(val)}
                    onSubmitEditing={handerRegister}
                />
                <Button
                    style={styles.button}
                    title="Register"
                    onPress={handerRegister}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
    },
    iconSignal: {
        width: 80,
        height: 80,
        borderRadius: 20,
    },
    button: {
        width: 250,
        height: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#6495ed",
    },
});

export default RegisterScreen;
