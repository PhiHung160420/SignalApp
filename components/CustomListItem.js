import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db, auth } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubcribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );
        return unsubcribe;
    }, []);

    return (
        <ListItem
            key={id}
            onPress={() => enterChat(id, chatName)}
            bottomDivider
        >
            <Avatar
                rounded
                size={35}
                source={{
                    uri:
                        chatMessages?.[0]?.photoURL ||
                        "https://cdn.iconscout.com/icon/premium/png-512-thumb/text-message-2416241-2030716.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontSize: 18, fontWeight: "bold" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName} :{" "}
                    {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem;
