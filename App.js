import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore , applyMiddleware} from 'redux';
import seatReducer from "./reduxConfig/SeatReducer";

const store = createStore(seatReducer, applyMiddleware(thunk));

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen'; 
import seats from './components/seats';


const App = () => {
  return (
    <Provider store= {store}> 
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="seats" component={seats} />
          </Stack.Navigator>
        
        </NavigationContainer>  
        
    </Provider>
  )
}


export default App;
