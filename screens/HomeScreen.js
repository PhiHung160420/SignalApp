import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    View,
    StyleSheet,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const handlerSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", { id: id, chatName: chatName });
    };

    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .onSnapshot((querySnapshot) => {
                setChats(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });

        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { background: "fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View>
                    <TouchableOpacity onPress={handlerSignOut}>
                        <Avatar
                            rounded
                            size="small"
                            source={{
                                uri: auth?.currentUser?.photoURL,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 70,
                        marginRight: 5,
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons
                            name="pencil"
                            size={22}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});

export default HomeScreen;
