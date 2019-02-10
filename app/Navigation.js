import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './LoginScreen';
import ContactScreen from './ContactScreen';
import ChatScreen from './ChatScreen';
const RootStack = createStackNavigator({
  Login: LoginScreen,
  Contacts: ContactScreen,
  Chat: ChatScreen,
});

const App = createAppContainer(RootStack);
export default App;
