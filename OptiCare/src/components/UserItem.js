import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const img = "https://example.com/default-avatar.png"

const UserItem = ({name, speciality, image}) => {
  return (
    <TouchableOpacity style={styles.ItemContainer} onPress={() => console.log(`You pressed user: ${name}`)}>
      <Image style={styles.profileImage} source={{ url: image }}/>
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.UserRoleText}>Speciality: {speciality}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default UserItem

const styles = StyleSheet.create({
    ItemContainer: {
        padding: 10,
        borderWidth: 1,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        width: 385
    },
    profileImage: {
        width: 60,
        height: 60,
    },
    info: {
        flexDirection: 'column',
        margin: 10
    }

})