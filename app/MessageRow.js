import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function MessageRow({message}) {
  if (message.status == 'sent')
    return (
      <View style={styles.userMessageRow}>
        <View style={styles.userMessageContainer}>
          <Text style={styles.userMessage}>
            {/* adds '//' is for seen  and '/' for unseen one at the end of message*/}
            {message.seen == true
              ? message.message + ' //'
              : message.message + ' /'}
          </Text>
        </View>
      </View>
    );
  else
    return (
      <View style={styles.contactMessageRow}>
        <View style={styles.contactMessageContainer}>
          <Text style={styles.contactMessage}>{message.message + ' //'}</Text>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  userMessage: {
    color: 'white',
  },
  userMessageContainer: {
    alignItems: 'center',
    backgroundColor: '#5d1f9c',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    padding: 5,
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  contactMessage: {
    color: 'black',
  },
  contactMessageContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(0,162,232)',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
  },
  contactMessageRow: {
    alignItems: 'flex-start',
  },
});
export default MessageRow;
