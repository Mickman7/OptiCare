import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState }  from 'react'
import {Calendar, LocaleConfig, Agenda, CalendarList} from 'react-native-calendars';


const CalendarScreen = () => {
  const [selected, setSelected] = useState('');

  const screenHeight = Dimensions.get('window').height;
  const currentDate = new Date().toISOString().split('T')[0];

  const agendaData = {
    '2025-01-22': [{name: 'Meeting 1', data: 'This is a test cell with dummy data'}],
    '2025-01-23': [{name: 'Meeitng 2', data: 'Aston is a silly guy', height: 80}],
    '2025-01-24': [{name: 'Meeting 3', data: 'Abba is a racist guy'}],
    '2025-01-31': [{name: 'Meeting 4'}, {name: 'any js object'}]
  }


  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.data}</Text>
      </TouchableOpacity>
    );
  };

  
  

  return (
    <View style={styles.calendarContainer}>
      <Agenda
        items={agendaData}
        current={currentDate}
        selected={currentDate}
        renderItem={renderItem}
        renderEmptyData={() => <View style={styles.emptyData}><Text>No events</Text></View>}
        style={{ height: screenHeight }}        
      />

    {/* <CalendarList
        // Set the starting date and initial month
        current={currentDate}
        // Enable month scrolling
        pastScrollRange={12}
        futureScrollRange={12}
        // Show the full calendar month
        showScrollIndicator={true}
        // Set the height of the calendar
        style={{ height: screenHeight }}
        // Optional: Customize the calendar appearance
        markingType={'simple'}
        markedDates={{
          [currentDate]: { selected: true, marked: true, selectedColor: '#13AE85' },
        }}
      /> */}
    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
  },
  item: {
    backgroundColor: 'lightblue',
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
})