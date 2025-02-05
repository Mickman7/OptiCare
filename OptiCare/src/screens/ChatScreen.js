import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, updateDoc, doc, where, getDocs } from 'firebase/firestore';
import { Pressable } from 'react-native-gesture-handler';

const ChatScreen = ({ route }) => {
  const { chatId, userId, userFirstName, userLastName } = route.params;
  const currentUser = FIREBASE_AUTH.currentUser;
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    if (!currentUser) return;

    const messagesRef = collection(FIREBASE_DB, 'chats', chatId, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp'));


    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    markMessagesAsRead();
    return unsubscribe;
}, [chatId]);

 useEffect(() => {
    const fetchMessages = async () => {
      // Create a reference to the messages subcollection and order by timestamp
      const messagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp")
      );

      // Get the messages from Firestore
      const querySnapshot = await getDocs(messagesQuery);

      // Map through the querySnapshot to extract the data and document ID
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set the messages to state
      setMessages(messagesData);
    };

    // Call the function to fetch messages
    fetchMessages();
  }, [chatId]);


  const sendMessage = async () => {
    if (!formValue.trim()) return;

    const messagesRef = collection(FIREBASE_DB, 'chats', chatId, 'messages');

    const messageData = {
      text: formValue,
      timestamp: serverTimestamp(),
      senderId: currentUser.uid,
      receiverId: userId,
      read: false
    };

    try {
      await addDoc(messagesRef, messageData);

      // Update lastMessage in chat document
      const chatRef = doc(FIREBASE_DB, 'chats', chatId);
      await updateDoc(chatRef, {
        lastMessage: formValue,
        lastMessageTimestamp: serverTimestamp()
      });

      setFormValue('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const markMessagesAsRead = async () => {
    const messagesRef = collection(FIREBASE_DB, `chats/${chatId}/messages`);
    const unreadQuery = query(messagesRef, where("receiverId", "==", currentUser.uid), where("read", "==", false));

    const unreadMessages = await getDocs(unreadQuery);
    unreadMessages.forEach(async (msg) => {
      await updateDoc(doc(FIREBASE_DB, `chats/${chatId}/messages/${msg.id}`), { read: true });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
      </View>

      <View style={styles.sendMessageContainer}>
        <TextInput 
          style={styles.input} 
          value={formValue} 
          onChangeText={setFormValue} 
          placeholder="Type a message..." 
        />

        <Pressable style={styles.button} onPress={sendMessage}>
          <Text>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ChatMessage = ({ message }) => {
  const { text, senderId } = message;
  const isSent = senderId === FIREBASE_AUTH.currentUser?.uid;

  return (
    <View style={isSent ? styles.sent : styles.received}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

export default ChatScreen;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  sent: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#DCF8C6', 
    padding: 10, 
    borderRadius: 5, 
    margin: 5 
  },
  received: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#ECECEC', 
    padding: 10, 
    borderRadius: 5, 
    margin: 5 
  },
  chatContainer: {
    flex: 0, 
    paddingBottom: 20,
    padding: 5
  },
  sendMessageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  
  },
  input: {
    height: 50,
    width: 350,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#13AE85',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})