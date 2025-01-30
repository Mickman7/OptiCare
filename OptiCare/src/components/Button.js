import React from 'react'
import { Vibration } from 'react-native';
import { Pressable, StyleSheet, Text, View, } from 'react-native';

export const Button = ({label, onClick, isLogin}) => {
  return (
    <Pressable onPress={onClick} style={styles.button}>
        <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
};


export default Button

const styles = StyleSheet.create({
    button: {
        minHeight: 50,
        maxHeight: 30,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'grey',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'center',
        width: 200,
        alignItems: 'center'
    },

})