import { Text, View, StyleSheet,TextInput, Image, Pressable } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import Wallpaper from '../assets/hospital wallpaper.jpg'

import React, { useState } from 'react'

const AuthForm = ({children, isLogin, setIsLogin}) => {
    
  return (
    <View style={styles.container}>
        <Text style={styles.formHeader}>{ isLogin ? "Welcome back" : "Register with us"}</Text>
        <View style={styles.formContainer}>
            {children}

            <View style={styles.bottomContainer}>
                <Text style={styles.toggleText} onPress={() => {setIsLogin(!isLogin)}}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </Text>
            </View>
        </View>

    </View>
  )
}


const InputText = ({label, value, onChange, isPassword}) => {
    return(
        <View style={styles.item}>
            <Text style={styles.itemLabel}>{label}</Text>
            <TextInput 
                value={value} 
                onChangeText={onChange}
                style={styles.itemTextInput}
                placeholder={label}
                secureTextEntry={isPassword}
            />
        </View>

    );
}

const InputSelect = ({ label, options, selectedValue, onValueChange }) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <SelectList
          data={options.map((option) => ({ key: option, value: option }))}
          setSelected={onValueChange} 
          defaultOption={{ key: selectedValue, value: selectedValue }}
          placeholder="Select an option"
          style={styles.selectStyles}
        />
      </View>
    );
  };
  


const AuthButton = ({label, onPress}) => {
    return(
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

AuthForm.InputText = InputText;
AuthForm.InputSelect = InputSelect;
AuthForm.AuthButton = AuthButton;




const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        hadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,

    },
    formHeader: {
        fontSize: 40,
        fontWeight: 'bold',
        padding: 16,
        marginVertical: 40,
        textAlign: 'center',
    },
    item: {
        padding: 16
    },
    itemLabel: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
      itemTextInput: {
        height: 50,
        width: 350,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#D9D9D9',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'lightgray',

      },
      bottomContainer: {
        margin: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      button: {
        minHeight: 50,
        maxHeight: 30,
        borderRadius: 25,
        backgroundColor: '#13AE85',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        width: 200,
        alignItems: 'center'
    },
    label: {
        // color: 'white',
        fontSize: 20,
        fontWeight: 'semibold'
    },
    toggleText: {
        color: 'green'
    },
    inputContainer: {
        marginBottom: 15,
        padding: 16,
        width: 375,
    },
    selectStyles: {
        
    }
})

export default AuthForm
