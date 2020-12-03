import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import seat from '../seat';
import CartItem from './cartItem';

class CartScreen extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            listOfItems: {}
        }
    }

    componentDidMount() {
        this.setState({
            listOfItems: this.trialFunction()
        })

        
    }

    //trying to improve cart functionality using below function
    trialFunction = () => {
        var seats = this.props.seats;
        var seatFoodobject = {};
        
        for (let i = 0; i < seats.length; i++) {
            seatFoodobject[seats[i]] = []
            
            this.props.foodArray.forEach(element => {
                if(element.seat === seats[i]) {
                    seatFoodobject[seats[i]].push(element);
                }
            });
        }

        return  seatFoodobject;
        
    }

    render() {
        const { listOfItems } = this.state;
        return(
            <View style={styles.process}>
                <ScrollView>
                    <View>
                        {
                            listOfItems.map((item, index) => <CartItem key={index} item={item} click={this.total} />)
                        }
                    </View>
                </ScrollView>
                <View style={styles.button} >
                    {/* <Button
                        title={this.props.food.total + ""}
                        color='orange'
                        onPress={() => console.log(this.props.food.total)}
                    /> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginLeft: 130
    },
    process: {
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => {
    console.log(state)
    return {
        seats: state.seatReducer.userSelectedSeats,
        foodArray: state.foodReducer.foodArray
    }
}
 
 
 export default connect(mapStateToProps)(CartScreen);
