import { StyleSheet, Text, View, TextInput, Image, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, updateDoc, doc, where, getDocs, deleteDoc } from 'firebase/firestore';
import { Pressable } from 'react-native-gesture-handler';

const ChatScreen = ({ route }) => {
  const { chatId, userId, userFirstName, userLastName } = route.params;
  const currentUser = FIREBASE_AUTH.currentUser;
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);

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
      const messagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp")
      );

      const querySnapshot = await getDocs(messagesQuery);

      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messagesData);
    };

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

      // Update lastMessage in chat collection
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

  const handleLongPress = (message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  const startEditingMessage = () => {
    setEditingMessageId(selectedMessage.id);
    setEditValue(selectedMessage.text);
    setIsModalVisible(false);
  };

  const saveEditedMessage = async () => {
    if (!editValue.trim() || !editingMessageId) return;

    try {
      const messageRef = doc(FIREBASE_DB, `chats/${chatId}/messages/${editingMessageId}`);
      await updateDoc(messageRef, { text: editValue });
      setEditingMessageId(null);
    } catch (error) {
      console.error("Error saving edited message:", error);
    }
  };

  const deleteMessage = async () => {
    if (!selectedMessage) return;

    try {
      const messageRef = doc(FIREBASE_DB, `chats/${chatId}/messages/${selectedMessage.id}`);
      await deleteDoc(messageRef);
      setIsModalVisible(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            onLongPress={() => handleLongPress(msg)}
            isEditing={editingMessageId === msg.id}
            editValue={editValue}
            setEditValue={setEditValue}
            saveEditedMessage={saveEditedMessage}
          />
        ))}
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

      {isModalVisible && (
        <Modal transparent={true} animationType="fade" visible={isModalVisible}>
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Pressable style={styles.button} onPress={startEditingMessage}>
                  <Text>Edit</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.deleteButton]} onPress={deleteMessage}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const ChatMessage = ({ message, onLongPress, isEditing, editValue, setEditValue, saveEditedMessage }) => {
  const { text, senderId } = message;
  const isSent = senderId === FIREBASE_AUTH.currentUser?.uid;

  return (
    <Pressable onLongPress={onLongPress}>
      <View style={isSent ? styles.sent : styles.received}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editValue}
            onChangeText={setEditValue}
            onSubmitEditing={saveEditedMessage}
            autoFocus
          />
        ) : (
          <Text style={styles.messageText}>{text}</Text>
        )}
      </View>
    </Pressable>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  editInput: {
    backgroundColor: '#FFF',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
})