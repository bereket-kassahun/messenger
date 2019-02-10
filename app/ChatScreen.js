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
  constructor() {
    super();
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.textInput = React.createRef();
  }

  state = {
    dataSource: '',
    messages: [],
    newMessage: '',
    loading: false,
    id: 1,
    live: false,
    password: 'kassahun',
    contactId: 8,
  };

  componentDidMount() {
    this._interval = setInterval(() => {
      this.getMessages();
    }, 9000);
    this.setLive();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    this.unsetLive();
  }

  getMessages() {
    const {navigation} = this.props;
    fetch(
      SERVER_GET_MESSAGES_URL +
        '?id=' +
        navigation.getParam('id', '21') +
        '&contact_id=' +
        navigation.getParam('contactId', '21'),
    )
      .then(response => response.json())
      .then(responseData => {
        var message = responseData.messages;
        // var oldMessagesNumber = this.state.messages.length;
        console.log(responseData);
        message.reverse();
        console.log(responseData);
        this.setState({
          messages: message,
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

  unsetLive() {
    const {navigation} = this.props;
    fetch(SERVER_UNSET_LIVE_URL + '?id=' + navigation.getParam('id', '1'))
      .then(response => response.json())
      .then(responseData => {})
      .done();
  }

  sendNewMessage() {
    var message = this.state.newMessage;
    // this.textInput.text.clear()
    if (message) {
      const {navigation} = this.props;
      fetch(
        SERVER_ADD_MESSAGES_URL +
          '?from_id=' +
          navigation.getParam('id', '1') +
          '&to_id=' +
          navigation.getParam('contactId', '8') +
          '&message=' +
          message,
      )
        .then(response => response.json())
        .then(responseData => {
          this.getMessages();
        })
        .done();
    } else {
      ShowMessage('empty', 'not sent');
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Button
          title={
            navigation.getParam('contactUsername', '1') +
            '      Live :' +
            this.state.live
          }></Button>

        <FlatList
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

    if (message.from_id == navigation.getParam('id', '8')) {
      return (
        <View style={styles.userMessageRow}>
          <View style={styles.userMessageContainer}>
            <Text style={styles.userMessage}>
              {message.seen == true
                ? message.message + ' //'
                : message.message + ' /'}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.contactMessageRow}>
          <View style={styles.contactMessageContainer}>
            <Text style={styles.contactMessage}>
              {message.seen == true
                ? message.message + ' //'
                : message.message + ' /'}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#f5fcff',
    flex: 1,
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
  whiteText: {
    color: 'white',
  },
});
