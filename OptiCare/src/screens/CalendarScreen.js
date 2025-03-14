import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native'
import React, { useEffect, useState }  from 'react'
import {Calendar, LocaleConfig, Agenda, CalendarList} from 'react-native-calendars';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

import EventForm from '../components/EventForm';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [eventInfo, setEventInfo] = useState({});

  const [isFormVisible, setFormVisible] = useState(false);





  const screenHeight = Dimensions.get('window').height;
  const currentDate = new Date().toISOString().split('T')[0];


  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log('Selected Date:', day.dateString);
  };


  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, 'events'));
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    const formattedData = events.reduce((acc, event) => {
      const date = event.date || selectedDate; 
      if (!acc[date]) acc[date] = [];
      acc[date].push({
        title: event.title,
        info: event.info,
        type: event.type,
        organiser: event.organiser,
        createdAt: event.createdAt, 
      });
      return acc;
    }, {});
  
    setEventInfo(formattedData);
  }

  
  

  useEffect(() => {
    fetchEvents()
  }, [selectedDate])


  const renderItem = (item) => {
    console.log('Rendering Item:', item); 

    return (
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>{item.title || 'Untitled'}</Text>
          <Text style={styles.itemText}>{item.info || 'Untitled'}</Text>
          <Text style={styles.itemText}>{item.type || 'Untitled'}</Text>
          <Text style={styles.itemText}>{item.organiser || 'Untitled'}</Text>
        </TouchableOpacity>
    );
  };

  
  

  
  

  return (
    <View style={styles.calendarContainer}>

      <Modal
        visible={isFormVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {setFormVisible(false)}}
      >

      {isFormVisible && (
        <View style={styles.overlay}>
          <EventForm
            onClose={() => setFormVisible(false)}
            selectedDate={selectedDate}
          />
        </View>
      )}

      </Modal>

      <Agenda
        items={eventInfo}
        current={currentDate}
        selected={currentDate}
        onDayPress={handleDayPress}
        renderItem={renderItem}
        renderEmptyData={() => <View style={styles.emptyData}><Text>No events</Text></View>}
        style={{ height: screenHeight }}        
      />

    <View style={styles.bottomContainer}>
      <TouchableOpacity 
        onPress={() => setFormVisible(true)}
        style={styles.addEventBtn}
      >
        <Text>Add Event</Text>
      </TouchableOpacity>
    </View>


    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    borderColor: 'gray',
    height: 350,
  },
  item: {
    backgroundColor: '#13AE85',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20
  },
  emptyData: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  bottomContainer: {
    alignItems: 'center'
  },
  addEventBtn: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    maxWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})