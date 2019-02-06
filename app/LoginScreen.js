import React from 'react';
import {View, Text,TouchableHighlight,TextInput, StyleSheet } from 'react-native';
import { UIManager} from 'react-native';
import ShowMessage from './ShowMessage'

global.IP_ADRESS = '192.168.43.119' // edit the value to your computers current IP adress

global.PORT = '3000' // port of the backend

var SERVER_LOGIN_URL = 'http://' + global.IP_ADRESS + ':'+ global.PORT + '/get_user';
var SERVER_SIGNUP_URL = 'http://' + global.IP_ADRESS + ':'+ global.PORT + '/add_user';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LoginScreen extends React.Component {

    state = {
        username: '',
        password:''
    }

    login() {
      if (this.state.username === '') {
        ShowMessage("Error", "Username cannot be empty");
        return;
      }
      if (this.state.password === '') {
        ShowMessage("Error", "Password cannot be empty");
        return;
      }
      fetch(SERVER_LOGIN_URL + '?username=' + this.state.username + '&password=' + this.state.password)
        .then((response) => response.json())
        .then((responseData) => {
          const id = responseData[0].id;
          if (id == -1) {
            ShowMessage("Error", "Invalid username and/or password");
          }
          else {
              this.props.navigation.navigate('Contact', {
                id : id,
                password: this.state.password,
                username: this.state.username,
              });
          }
        })
        .done();
    }
  
    signup() {
      if (this.state.username === '') {
        ShowMessage("Error", "Username cannot be empty");
        return;
      }
      if (this.state.password === '') {
        ShowMessage("Error", "Password cannot be empty");
        return;
      }
  
      fetch(SERVER_SIGNUP_URL + '?username=' + this.state.username + '&password=' + this.state.password)
        .then((response) => response.json())
        .then((responseData) => {
          const status = responseData.status;
          if (status === -1) {
            ShowMessage("Error", "This username is already taken");
          }
          else {
            ShowMessage("Success", "You have successfully signed up");
          }
        })
        .done();
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style = {styles.contentContainer}>
                <View style = {styles.inputView}>
                    <TextInput 
                        style = {styles.textInput}
                        placeholder = {'username'}
                        text = {this.state.username}
                        onChangeText = {(e) => this.setState({username: e})} />
                </View>
                <View style = {styles.inputView}>
                    <TextInput 
                        secureTextEntry={true}
                        style = {styles.textInput}
                        placeholder = {'password'}
                        text = {this.state.password}
                        onChangeText = {(e) => this.setState({password: e})} />
                </View>
                <View style = {styles.buttonsContainer}>
                    <TouchableHighlight 
                        style = {styles.button}
                        onPress = {() => this.login()}> 
                        <Text style = {styles.whiteText}>
                        Login
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style = {styles.button}
                        onPress = {() => this.signup()}> 
                        <Text style = {styles.whiteText}>
                        Sign up
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgb(0,128,255)',
      borderColor: 'rgb(0,128,255)',
      borderStyle: 'solid',
      borderRadius: 2,
      borderWidth: 2,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      padding: 5,
    },
    buttonsContainer: {
      flexDirection: 'row',
    }, 
    contentContainer: {
      alignItems: 'center',
      backgroundColor: '#f5fcff',
      justifyContent: 'center',
    },
    inputView: {
      alignItems: 'center',
      borderColor: 'rgb(0,128,255)',
      borderStyle: 'solid',
      borderWidth: 3,
      height: 40,
      justifyContent: 'center',
      marginTop: 20,
    },
    mainContainer: {
      flex: 1,
    },
    textInput: {
      alignItems: 'center',
      borderColor: 'rgb(0,128,255)',
      borderStyle: 'solid',
      borderWidth: 1,
      justifyContent: 'center',
      textAlign: 'center',
      width: 200,
    },
    toolbar: {
      backgroundColor: 'rgb(0,128,255)',
      height: 56,
    },
    whiteText: {
      color: 'white',
    },
  });
  
  