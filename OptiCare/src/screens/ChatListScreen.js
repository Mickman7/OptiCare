import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import DefaultProfile from '../assets/DefaultProfileImage.png'



const ChatListScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // Changed from direct access

    useEffect(() => {
        // Add auth state listener
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                getUsers(); // Only fetch users if we have a current user
            }
        });

        return unsubscribe; // Cleanup on unmount
    }, []);

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
        if (!currentUser) {
            console.log("No authenticated user");
            navigation.navigate('Login');
            return;
        }
        
        try {
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
            
            navigation.navigate('ChatScreen', { 
                chatId, 
                userId: selectedUserId, 
                userFirstName: selectedUser.firstName, 
                userLastName: selectedUser.lastName, 
                userPhotoURL: selectedUser.photoURL 
            });
        } catch (error) {
            console.error("Chat creation error:", error.message, error);
            throw new Error(`Failed to create or navigate to chat: ${error.message}`);
        }
    };
    

    return (
        <ScrollView>
            {userInfo.map((user) => (
                <TouchableOpacity
                    key={user.userId}
                    style={styles.ItemContainer}
                    onPress={() => handleChatPress(user)}
                >
                    <Image style={styles.profileImage} source={ user.photoURL ?  DefaultProfile : DefaultProfile } />
                    <View style={styles.info}>
                        <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default ChatListScreen;


const styles = StyleSheet.create({
    ItemContainer: {
        padding: 10,
        margin: 10,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center'

    },
    profileImage: {
        width: 50,
        height: 50,
        marginRight: 10
    }
})