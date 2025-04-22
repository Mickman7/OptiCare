import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params || {};
  const [title, setTitle] = useState(event?.title || '');
  const [info, setInfo] = useState(event?.info || '');
  const [type, setType] = useState(event?.type || '');
  const [organiser, setOrganiser] = useState(event?.organiser || '');

  const handleUpdate = async () => {
    if (!event?.eventId) {
      Alert.alert('Error', 'Event ID is missing');
      return;
    }

    try {
      const eventRef = doc(FIREBASE_DB, 'events', event.eventId);
      await updateDoc(eventRef, { title, info, type, organiser });
      Alert.alert('Success', 'Event updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('Error', 'Failed to update event');
    }
  };

  const handleDelete = async () => {
    if (!event?.eventId) {
      Alert.alert('Error', 'Event ID is missing');
      return;
    }

    try {
      const eventRef = doc(FIREBASE_DB, 'events', event.eventId);
      await deleteDoc(eventRef);
      Alert.alert('Success', 'Event deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Info:</Text>
      <TextInput
        style={styles.input}
        value={info}
        onChangeText={setInfo}
      />
      <Text style={styles.label}>Type:</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
      />
      <Text style={styles.label}>Organiser:</Text>
      <TextInput
        style={styles.input}
        value={organiser}
        onChangeText={setOrganiser}
      />
      <View style={styles.buttonContainer}>
        <Button title="Update Event" onPress={handleUpdate} />
        <Button title="Delete Event" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
