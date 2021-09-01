import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    TextInput,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/auth";

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: -20,
                    }}
                >
                    <Avatar
                        rounded
                        size={30}
                        source={{
                            uri: messages[0]?.data.photoURL,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "500",
                            color: "white",
                            marginLeft: 10,
                        }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 70,
                        alignItems: "center",
                        marginRight: 5,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome
                            name="video-camera"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, messages]);

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
        return unsubscribe;
    }, [route]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInput("");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView
                            contentContainerStyle={{ paddingVertical: 15 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receive}>
                                        <Avatar
                                            rounded
                                            size={30}
                                            //WEB
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            position="absolute"
                                            bottom={-15}
                                            right={-5}
                                            source={{ uri: data.photoURL }}
                                        />
                                        <Text style={styles.recieverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.send}>
                                        <Avatar
                                            rounded
                                            size={30}
                                            //WEB
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5,
                                            }}
                                            position="absolute"
                                            bottom={-15}
                                            left={-5}
                                            source={{ uri: data.photoURL }}
                                        />
                                        <Text style={styles.senderText}>
                                            {data.message}
                                        </Text>
                                        <Text style={styles.senderName}>
                                            {data.displayName}
                                        </Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Signal Message"
                                value={input}
                                onChangeText={(val) => setInput(val)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}
                            >
                                <Ionicons
                                    name="send"
                                    size={24}
                                    color="#2B68E6"
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "gray",
        borderRadius: 30,
    },
    receive: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    send: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 17,
        color: "white",
        fontWeight: "bold",
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
});
