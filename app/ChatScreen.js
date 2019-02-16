import React from 'react';
import {
  Button,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  TextInput,
} from 'react-native';
import MessageRow from './MessageRow';

const PORT = '3000';
var SERVER_ADD_MESSAGES_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/add_message';
var SERVER_GET_MESSAGES_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/get_messages';
const SERVER_SET_LIVE_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/set_online';
const SERVER_UNSET_LIVE_URL =
  'http://' + global.IP_ADRESS + ':' + PORT + '/unset_online';
var ShowMessage = require('./ShowMessage');

export default class App extends React.Component {
  state = {
    key: '',
    dataSource: '',
    newMessage: '',
    live: false,
  };

  componentDidMount() {
    //checks for new message every 9 seconds
    this._interval = setInterval(() => {
      this.getMessages();
    }, 9000);
    this.setLive();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    //unsetting live when leaving the chat page
    this.unsetLive();
  }

  getMessages() {
    const {navigation} = this.props;
    fetch(
      SERVER_GET_MESSAGES_URL +
        '?id=' +
        navigation.getParam('id', '1') +
        '&contact_id=' +
        navigation.getParam('contactId', '1'),
    )
      .then(response => response.json())
      .then(responseData => {
        var message = responseData.messages;

        // makes recent messages to the bottom of flatlist view
        message.reverse();
        this.setState({
          key: message.message_id,
          dataSource: message,
          live: responseData.live[0].online == 1 ? 'true' : 'false',
        });
      })
      .done();
  }

  setLive() {
    const {navigation} = this.props;
    fetch(SERVER_SET_LIVE_URL + '?id=' + navigation.getParam('id', '1'))
      .then(response => response.json())
      .then(responseData => {})
      .done();
  }

  clear() {
    this.textInput.clear();
    this.setState({newMessage: ''});
  }
  unsetLive() {
    const {navigation} = this.props;
    fetch(SERVER_UNSET_LIVE_URL + '?id=' + navigation.getParam('id', '1'))
      .then(response => response.json())
      .then(responseData => {})
      .done();
  }

  //called when send button is clicked
  sendNewMessage() {
    //getting text of textinput
    var message = this.state.newMessage;

    if (message) {
      const {navigation} = this.props;
      fetch(
        SERVER_ADD_MESSAGES_URL +
          '?from_id=' +
          navigation.getParam('id', '1') +
          '&to_id=' +
          navigation.getParam('contactId', '1') +
          '&message=' +
          message,
      )
        .then(response => response.json())
        .then(responseData => {
          this.getMessages();
          this.clear();
        })
        .done();
    } else {
      ShowMessage('Error', 'no message to send');
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Button
          title={
            navigation.getParam('contactUsername', '') +
            '      Live :' +
            this.state.live
          }></Button>

        <FlatList
          key={this.state.key}
          data={this.state.dataSource}
          renderItem={({item}) => this.renderMessage(item)}
          keyExtractor={item => item.contact_id}
          style={styles.listView}
          inverted={true}
          // style = {styles.listView}
          // extraData={this.state.loading}
        />
        <View style={styles.inputAndSendView}>
          <TextInput
            ref={input => {
              this.textInput = input;
            }}
            style={styles.inputMessage}
            placeholder={'Enter new message here'}
            text={this.state.newMessage}
            onChangeText={e => {
              this.setState({newMessage: e});
            }}
            ref={input => {
              this.textInput = input;
            }}
          />
          <TouchableHighlight
            style={styles.sendButton}
            onPress={() => {
              this.sendNewMessage();
            }}>
            <Text style={styles.whiteText}>SEND</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  renderMessage(message) {
    const {navigation} = this.props;

    //render for sent messages
    if (message.from_id == navigation.getParam('id', '8')) {
      return (
        <MessageRow
          message={{...message, status: 'sent'}}
          key={this.state.key}
        />
      );
    }
    //render for received messages
    else {
      return (
        <MessageRow
          message={{...message, status: 'received'}}
          key={this.state.key}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#f5fcff',
    flex: 1,
  },
  listView: {
    backgroundColor: '#f5fcff',
    flex: 1,
  },
  inputAndSendView: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: '#5d1f9c',
    borderStyle: 'solid',
    borderTopWidth: 2,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
  inputMessage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputView: {
    alignItems: 'center',
    flex: 80,
    justifyContent: 'center',
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
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#5d1f9c',
    height: 40,
    justifyContent: 'center',
    padding: 5,
    width: 80,
  },
  sendButtonView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: '#5d1f9c',
    height: 56,
  },
  whiteText: {
    color: 'white',
  },
});
