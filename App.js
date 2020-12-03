import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore , applyMiddleware , combineReducers } from 'redux';
import seatReducer from "./reduxConfig/SeatReducer";
import foodReducer from './reduxConfig/foodlist/foodlistReducer';
import foodorderReducer from './reduxConfig/foodlist/foodorderReducer';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  seatReducer,
  foodReducer,
  foodorderReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));


import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import Fooditems from './components/foodScreen/Fooditems';
import seats from './components/seats';
import orderFood from './components/foodorderScreen/orderFood';
import CartScreen from './components/cartScreen/cartScreen';


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
         
          <Stack.Screen name="seats" component={seats} />
          <Stack.Screen name="fooditems" component={Fooditems} />
          <Stack.Screen name="orderfood" component={orderFood} />
          <Stack.Screen name="cart" component={CartScreen} />

          </Stack.Navigator>
        
        </NavigationContainer>  
        
    </Provider>
  )
}


export default App;
