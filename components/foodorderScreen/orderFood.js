import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import OrderItems from './foodamountSelection';
import { connect } from 'react-redux';

class OrderFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodItems:[]
        }

        console.log("orderFood constructor");
    } 

    componentDidMount() {
        console.log("orderFood componentDidMount");

        //below setTimeout is used if user take to much time on this screen without process we will proceed him on other Screen
        // setTimeout(() => {
        //     this.props.navigation.navigate('Home');
        // }, 10000);

        this.setState({
            foodItems: this.props.foodItemsArray
        }, console.log(this.props.foodItemsArray))
    }

    componentWillUnmount() {
        console.log("food selection is unmounting");
    }

    render() {
        const { foodItems } = this.state
        
        return (
            <View>
                <View style={styles.view}>
                    {
                        foodItems.length === 0 ? false : <OrderItems item={foodItems[foodItems.length - 1]} navigation={this.props.navigation} />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        margin: 10,
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        foodItemsArray: state.foodorderReducer.foodItemsArray
     }
}
 
export default connect(mapStateToProps)(OrderFood)
