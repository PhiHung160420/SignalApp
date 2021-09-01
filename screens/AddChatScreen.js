import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
        });
    }, []);

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input,
            })
            .then(() => navigation.goBack())
            .catch((err) => alert(err.message));
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(val) => setInput(val)}
                leftIcon={<AntDesign name="wechat" size={24} color="black" />}
                onSubmitEditing={createChat}
            />
            <Button
                disabled={!input}
                onPress={createChat}
                title="Create new chat"
                containerStyle={styles.button}
            />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
    },
    button: {
        width: 250,
        height: 50,
    },
});
