import React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import {Icon} from 'react-native-elements';

import ShowMessage from './ShowMessage';

const PORT = '3000';
var SERVER_ADD_CONTACT_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/add_contact';
var SERVER_GET_CONTACTS_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/get_contacts';
const SERVER_DELETE_CONTACT_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/delete_contact';

export default class ContactScreen extends React.Component {
  state = {
    contacts: [],
    dataSource: [],
    input_username: '',
  };

  componentDidMount() {
    this.getContacts();
  }

  addNewContact() {
    const {navigation} = this.props;
    if (
      this.state.input_username === navigation.getParam('username', 'bereket')
    ) {
      ShowMessage('Error', 'You cannot add yourself to contacts!');
      return;
    }
    for (var i = 0; i < this.state.contacts.length; i++) {
      if (this.state.input_username === this.state.contacts[i].username) {
        ShowMessage(
          'Error',
          'Contact ' + this.state.contact + ' already exists',
        );
        return;
      }
    }
    fetch(
      SERVER_ADD_CONTACT_URL +
        '?id=' +
        navigation.getParam('id', '1') +
        '&contact_username=' +
        this.state.input_username,
    )
      .then(response => response.json())
      .then(responseData => {
        var result = responseData.id;
        var contactId = responseData.contact_id;
        if (result != -1) {
          this.setState(prev => {
            return {
              dataSource: prev.dataSource.concat(responseData),
              contacts: prev.contacts.concat(responseData),
            };
          });
          ShowMessage(
            'Success',
            'User ' + this.state.input_username + ' was added to your contacts',
          );
        } else {
          ShowMessage(
            'Error',
            'User ' + this.state.input_username + ' not found',
          );
        }
      })
      .done();
  }

  getContacts() {
    const {navigation} = this.props;
    fetch(SERVER_GET_CONTACTS_URL + '?id=' + navigation.getParam('id', '1'))
      .then(response => response.json())
      .then(responseData => {
        // this.hideProgressBar();
        this.setState({
          contacts: responseData,
          dataSource: responseData,
        });
      })
      .done();
  }
  deleteContact(contact_id) {
    const {navigation} = this.props;
    fetch(
      SERVER_DELETE_CONTACT_URL +
        '?id=' +
        navigation.getParam('id', '1') +
        '&contact_id=' +
        contact_id,
    )
      .then(response => response.json())
      .then(responseData => {
        // this.hideProgressBar();
        if (responseData.status) {
          ShowMessage('contact successfully deleted');
          this.getContacts();
        } else {
          ShowMessage('unable to delete the contact');
        }
      })
      .done();
  }
  goToChat(item) {
    const {navigation} = this.props;
    navigation.push('Chat', {
      id: navigation.getParam('id', 1),
      password: navigation.getParam('password', 'kassahun'),
      username: navigation.getParam('username', 'bereket'),
      contactId: item.contact_id,
      contactUsername: item.username,
    });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item.contact_id}
          style={styles.listView}
          extraData={this.state.loading}
        />
        <TextInput
          placeholder={'username'}
          onChangeText={e => {
            this.setState({input_username: e});
          }}></TextInput>
        <Button title={'ADD TO CONTACT'} onPress={() => this.addNewContact()} />
      </View>
    );
  }
  renderItem(item) {
    return (
      <View style={styles.contactContainer}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.goToChat(item)}>
          <Text style={styles.contact}>{item.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              width: 40,
              height: 40,
              backgroundColor: '#fff',
              borderRadius: 50,
            }}
            raised
            name="delete"
            type="material"
            color="#f50"
            onPress={() => this.deleteContact(item.contact_id)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contact: {
    color: '#5d1f9c',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 15,
  },
  contactContainer: {
    backgroundColor: '#f5fcff',
    borderBottomWidth: 2,
    borderColor: '#5d1f9c',
    borderStyle: 'solid',
    borderTopWidth: 0,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  contentContainer: {
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'center',
  },
  listView: {
    backgroundColor: '#f5fcff',
  },
  mainContainer: {
    flex: 1,
  },
  progressBarContainer: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: '#5d1f9c',
    height: 56,
  },
});
