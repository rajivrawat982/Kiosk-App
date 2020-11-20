import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import FoodItem from './FoodItem';
import { connect } from 'react-redux';


class FoodItems extends React.Component{
  constructor(props) {
    super(props) 
    this.state = {
      Items: []
    }
  }

  componentDidMount() {
    fetch('http://10.10.3.91:4000/api/foodlist')
    .then(response => response.json())
    .then((data) => {
      this.setState({
        Items: data
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  viewCart = () => {
    if(this.props.food.foodArray.length !== 0) {
      this.props.navigation.navigate('process') 
    }
  }

  render() {
    const { Items } = this.state;
    return(
      <View style={styles.flex_1}>
        <ScrollView>
          <View style={styles.flex}>
            {
              Items.map((food, index) => <FoodItem key={index} item={food} navigation={this.props.navigation}/>)
            }
          </View>
        </ScrollView>
          <TouchableOpacity style={this.props.food.foodArray.length !== 0 ?  [styles.button, {visibility: 'visible'}]: {display: 'none'}} onPress={() => this.viewCart()}>
            <Text style={styles.text}>View Cart</Text> 
            <Text style={styles.text}>Total: {this.props.food.total}</Text> 
          </TouchableOpacity>
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
      food: state.reducerOrder,
   }
}


export default connect(mapStateToProps)(FoodItems)