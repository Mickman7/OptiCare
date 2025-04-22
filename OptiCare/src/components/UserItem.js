import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import OnlineStatus from './OnlineStatus'


const UserItem = ({ name, speciality, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.ItemContainer} onPress={onPress}>
      <Image style={styles.profileImage} source={image} />
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.UserRoleText}>Speciality: {speciality}</Text>
      </View>
    </TouchableOpacity>
  );
};


const UserCard = ({image, name}) => {
  return(
    <ScrollView horizontal={true}>
      <TouchableOpacity style={styles.userCardContainer} onPress={() => console.log(`You pressed user: ${name}`)}>
        <Image style={styles.CardProfileImage} source={image}/>
        <Text style={styles.nameText}>{name}</Text>
        <OnlineStatus label='Online'/>
      </TouchableOpacity>
    </ScrollView>
  );
}


const PatientItem = ({name, nhsNumber, navigation}) => {
  return (
    <TouchableOpacity style={styles.ItemContainer} onPress={navigation}>
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.UserRoleText}>NHS Number: {nhsNumber}</Text>
      </View>
    </TouchableOpacity>
  )
}

UserItem.UserCard = UserCard;
UserItem.PatientItem = PatientItem;


export default UserItem

const styles = StyleSheet.create({
    ItemContainer: {
        padding: 10,
        borderBottomWidth: 0.5,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: 385
    },
    userCardContainer: {
      borderWidth: 2,
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'lightgrey',
      borderRadius: 10,
      marginHorizontal: 5,
      backgroundColor: 'white'

    },
    profileImage: {
        width: 60,
        height: 60,
    },
    CardProfileImage: {
      width: 50,
      height: 50
    },
    info: {
        flexDirection: 'column',
        margin: 10
    },
    

})