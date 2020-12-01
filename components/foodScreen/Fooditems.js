import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import FoodItem from './Fooditem';
import { connect } from 'react-redux';
import axios from 'axios';
import {initialFoodlist , getUpdatedFoodlist, updateFoodlist} from '../../reduxConfig/foodlist/foodAction';
import socketIO from 'socket.io-client';



class FoodItems extends React.Component{
  // _isMounted = false;

  constructor(props) {
    super(props) 
    this.state = {
      foodItems: []
    }

    console.log("fooditems constructor");
  }

  componentDidMount() {

    console.log("fooditems componentDidMount")
    axios.get('http://10.10.3.91:4000/api/foodlist').then(
      response => {
        this.setState({
          foodItems: response.data
        })
      }
    ).then(this.updatingReduxFoodlist)

    //always listening for this foodevent anytime foodAmount updates it will update in every single instance 
    const socket = socketIO("http://10.10.3.91:4000")
    socket.on('updatedFooddata', res => {
      this.props.socketFoodlist(res);
    })

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({                                           
        foodItems: this.props.foodlist
      })
    })

  }

  componentWillUnmount() {
    console.log("foodlist screen is unmounting");
    this._unsubscribe();
  }

  updatingReduxFoodlist = () => {
    this.props.apiFood(this.state.foodItems);
    this.setState({
      foodItems: this.props.foodlist
    })
  }

  // viewCart = () => {
  //   if(this.props.foodArray.length !== 0) {
  //     this.props.navigation.navigate('process') 
  //   }
  // }

  render() {
    const { foodItems } = this.state;
    return(
      <View style={styles.flex_1}>
        <ScrollView>
          <View style={styles.flex}>
            {
              foodItems.map((fooditem, index) => <FoodItem key={index} item={fooditem} navigation={this.props.navigation}/>)
            }
          </View>
        </ScrollView>
          {/* <TouchableOpacity style={this.props.food.foodArray.length !== 0 ?  [styles.button, {visibility: 'visible'}]: {display: 'none'}} onPress={() => this.viewCart()}>
            <Text style={styles.text}>View Cart</Text> 
            <Text style={styles.text}>Total: {this.props.food.total}</Text> 
          </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 50
  },
  button: {
    backgroundColor: 'orange',
    position: "absolute",
    bottom: 0,
    right:0,
    left: 0,
    display: 'flex',
    flexDirection: "row"
  },
  text: {
    marginTop: 15,
    marginBottom: 15,
    color: 'white',
    fontSize: 16,
    flex: 3,
    textAlign: "center"
  }
})
const mapStateToProps = (state) => {
  return {
      foodArray: state.foodReducer.foodArray,
      foodlist: state.foodReducer.foodlist
   }
}

const mapDispatchToProps = dispatch => {
  return {
    updatedFood: (socket) => dispatch(getUpdatedFoodlist(socket)),
    apiFood: (foodItems) => dispatch(initialFoodlist(foodItems)),
    socketFoodlist: (foodItems) => dispatch(updateFoodlist(foodItems))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FoodItems);