import { Button, StyleSheet, Text, View, TextInput, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Pressable } from 'react-native-gesture-handler';

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;
  const messageClass = uid === FIREBASE_AUTH.currentUser?.uid ? 'sent' : 'received';

  return (
    <View style={messageClass === 'sent' ? styles.sent : styles.received}>
      <Image source={{ uri: photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png' }} style={styles.image} />
      <Text>{text}</Text>
    </View>
  );
};

const ChatScreen = () => {
  const [user] = useAuthState(FIREBASE_AUTH);
  const messagesRef = collection(FIREBASE_DB, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async () => {
    console.log('working...')
    if (!formValue.trim()) return; // Prevent empty messages

    const { uid, photoURL } = FIREBASE_AUTH.currentUser;

    console.log('working......')

    const messageData = {
      text: formValue,
      createdAt: serverTimestamp(), // Firestore timestamp
      uid,
      photoURL: photoURL || "https://example.com/default-avatar.png" // Ensure there's always an image
    };

    console.log("Sending message:", messageData); 

    try {
      await addDoc(messagesRef, messageData);
      console.log("Message successfully sent!");
      setFormValue(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
    
    console.log('message sent')
    setFormValue(''); // Clear input after sending
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {messages && messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
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