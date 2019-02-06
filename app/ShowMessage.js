import React from 'react'
import {
  Alert,
} from 'react-native';

function ShowMessage(title, message) {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
}

module.exports = ShowMessage;