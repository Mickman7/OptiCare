import { StyleSheet, Text, View, Dimensions, check } from 'react-native'
import React from 'react'



const InfoCard = ({date, time, eventType, info}) => {


    
  return (
    <View style={styles.infoCardContainer}>
    <View style={styles.left}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.eventType}>{eventType}</Text>
        <Text style={styles.infoBox}>{info}</Text>
    </View>
      <View style={styles.right}>
        <View style={styles.checkBox}></View>
        <Text>Lorem Ipsum</Text>
        <View style={styles.checkBox}></View>
        <Text>Lorem Ipsum</Text>
        <View style={styles.checkBox}></View>
        <Text>Lorem Ipsum</Text>
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

    },
    time: {

    },
    eventType: {

    },
    infoBox: {

    },
    right: {
        borderWidth: 1,
        flexDirection: 'column',
        padding: 5,
        borderRadius: 5,
        flexDirection: 'column'

    },
    checkBox: {
        borderWidth: 1,
        width: 5,
        height: 5,
    }

})