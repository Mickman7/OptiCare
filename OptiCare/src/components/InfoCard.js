import { StyleSheet, Text, View, Dimensions, check } from 'react-native'
import React from 'react'



const InfoCard = ({date, time, eventType, info}) => {


    
  return (
    <View style={styles.infoCardContainer}>
    <View style={styles.left}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.eventType}>Type: {eventType}</Text>
        <Text style={styles.infoBox}>{info}</Text>
    </View>
      <View style={styles.right}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.checkBox}></View>
          <Text>Lorem Ipsum</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.checkBox}></View>
          <Text>Lorem Ipsum</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.checkBox}></View>
          <Text>Lorem Ipsum</Text>
        </View>
      </View>
    </View>
  )
}

export default InfoCard

const styles = StyleSheet.create({
    infoCardContainer: {
        borderWidth: 3,
        borderColor: 'lightgrey',
        padding: 15,
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        maxWidth: 400,
        minWidth: 350,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {

    },
    date: {
      color: '#13AE85',
      fontSize: 25,
      fontWeight: 'bold'
    },
    time: {

    },
    eventType: {

    },
    infoBox: {
      width: 200,
      height: 'auto',
      padding: 5,
      marginVertical: 2,
      backgroundColor: 'lightgrey',
    },
    right: {
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 5,
        borderRadius: 5,
        height: 100
    },
    checkBox: {
        borderWidth: 1,
        width: 10,
        height: 10,
        marginRight: 5
    }

})