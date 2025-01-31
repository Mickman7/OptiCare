import { Text, View, StyleSheet,TextInput, Image, Pressable } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import Wallpaper from '../assets/hospital wallpaper.jpg'

import React, { useState } from 'react'

const AuthForm = ({children, isLogin, setIsLogin}) => {
    
  return (
    <View style={styles.container}>
        {/* <Image source={Wallpaper} style={styles.backgroundImg}/> */}
        <Text style={styles.formHeader}>{ isLogin ? "Welcome back" : "Register with us"}</Text>
        {children}

        <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={() => {setIsLogin(!isLogin)}}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
        </View>

    </View>
  )
}


const InputText = ({label, value, onChange}) => {
    return(
        <View style={styles.item}>
            <Text style={styles.itemLabel}>{label}</Text>
            <TextInput 
                value={value} 
                onChangeText={onChange}
                style={styles.itemTextInput}
                placeholder={label}
            />
        </View>

    );
}

const InputSelect = ({label, prompt, options, value, onChange}) => {

    const selectListData = options.map((option) => ({
        key: option.value,
        value: option.label,
      }));


    return(
        <View style={styles.container}>
            <Text style={styles.itemLabel}>{label}</Text>
            <SelectList
                setSelected={onChange}
                data={selectListData}
                placeholder={prompt}
                defaultOption={selectListData.find((item) => item.key === value)}
                boxStyles={styles.selectListBoxStyle}
                dropdownStyles={styles.selectListDropdownStyle}
            >
                

            </SelectList>
        </View>

    );
}


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
    backgroundImg: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    },
    formHeader: {
        fontSize: 40,
        fontWeight: 'bold',
        padding: 16,
        marginVertical: 40,
        textAlign: 'center'
    },
    item: {
        padding: 16
    },
    itemLabel: {
        color: 'grey',
        fontSize: 16,
        marginBottom: 5,
    },
      itemTextInput: {
        height: 50,
        width: 300,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: 'white',
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
      toggleText: {
        color: 'green'
      }
})

export default AuthForm
