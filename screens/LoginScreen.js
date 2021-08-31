import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.push("Home");
            }
        });

        return unsubcribe;
    }, []);

    const SignIn = () => {};

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Signal_ultramarine_icon.png",
                    }}
                    style={styles.iconSignal}
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    type="password"
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
                <Button
                    title="Login"
                    containerStyle={styles.button}
                    onPress={SignIn}
                />
                <Button
                    title="Register"
                    type="outline"
                    containerStyle={styles.button}
                    onPress={() => navigation.navigate("Register")}
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
    iconSignal: {
        width: 120,
        height: 120,
        borderRadius: 20,
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
    },
    button: {
        width: 250,
        height: 50,
    },
});

export default LoginScreen;
