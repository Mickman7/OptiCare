import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState }  from 'react'
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';


const CalendarScreen = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.calendarContainer}>
      <Agenda
        items={{
          '2025-01-22': [{name: 'Meeting 1', data: 'This is a test cell with dummy data'}],
          '2025-01-23': [{name: 'Meeitng 2', data: 'Aston is a silly guy', height: 80}],
          '2025-01-24': [{name: 'Meeting 3', data: 'Abba is a racist guy'}],
          '2025-01-31': [{name: 'Meeting 4'}, {name: 'any js object'}]
        }}

        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
      
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
  }
})