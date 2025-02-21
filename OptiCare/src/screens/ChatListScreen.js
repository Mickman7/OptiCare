import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";


const profileImg  = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'


const ChatListScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState([]);
    const currentUser = FIREBASE_AUTH.currentUser;

    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
            const userData = querySnapshot.docs.map(doc => ({
                userId: doc.data().userId, 
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                photoURL: doc.data().photoURL,
                speciality: doc.data().speciality
            }));
            setUserInfo(userData);
        } catch (err) {
            console.log('Fetch Error: ', err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleChatPress = async (selectedUser) => {
        if (!currentUser) return;
    
        const selectedUserId = selectedUser.userId;
        const currentUserId = currentUser.uid; 
    
        const chatId = [currentUserId, selectedUserId].sort().join("_");
    
        const chatRef = doc(FIREBASE_DB, "chats", chatId);
        const chatSnap = await getDoc(chatRef);
    
        if (!chatSnap.exists()) {
            await setDoc(chatRef, {
                chatId,
                participants: [currentUserId, selectedUserId],
                lastMessage: "",
                lastMessageTimestamp: null
            });
        }

    
        // Navigate to Chat Screen with the correct chatId
        navigation.navigate('ChatScreen', { 
            chatId, 
            userId: selectedUserId, 
            userFirstName: selectedUser.firstName, 
            userLastName: selectedUser.lastName, 
            userPhotoURL: selectedUser.photoURL 
        });
    };
    

    return (
        <View>
            {userInfo.map((user) => (
                <TouchableOpacity
                    key={user.userId}
                    style={styles.ItemContainer}
                    onPress={() => handleChatPress(user)}
                >
                    <Image style={styles.profileImage} source={ user.photoURL ?  {uri: profileImg} :{ uri: profileImg} } />
                    <View style={styles.info}>
                        <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ChatListScreen;


const styles = StyleSheet.create({
    ItemContainer: {
        padding: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'

    },
    profileImage: {
        width: 50,
        height: 50,
        marginRight: 10
    }
})