import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AuthForm from './AuthForm'

const PatientDetailsForm = () => {

    const [nhsNum, setNhsNum] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress]  = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')



    const handleSubmit = () => {
        console.log('form submitted')
    }


  return (
    <View style={styles.container}>
      <Text>PatientDetailsForm</Text>
      <AuthForm.InputText
        label='NHS Number'
        value={nhsNum}
        onChange={() => setNhsNum}
        isPassword={false}
      />

      <AuthForm.InputText
        label='First Name'
        value={firstName}
        onChange={() => setFirstName}
        isPassword={false}
      />

      <AuthForm.InputText
        label='Last Name'
        value={lastName}
        onChange={() => setLastName}
        isPassword={false}
      />

      {/* Date of birth form */}
     
     <AuthForm.InputSelect
        label='Gender'
        options={['Male', 'Female', 'Other']}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
     />

    <AuthForm.InputText
        label='Address'
        value={address}
        onChange={() => setAddress}
        isPassword={false}
    />
    <AuthForm.InputText
        label='Phone number'
        value={telephone}
        onChange={() => setTelephone}
        isPassword={false}
    />
    <AuthForm.InputText
        label='Email'
        value={email}
        onChange={() => setAddress}
        isPassword={false}
    />

    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text>Submit</Text>
    </TouchableOpacity>


    </View>
  )
}

export default PatientDetailsForm

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 1
    },
    submitButton: {
        width: 150,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#13AE85',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})