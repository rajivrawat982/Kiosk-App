import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
// import socketIO from 'socket.io-client';
import { socket } from "../../SocketComponent";


 
class OrderSeat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            food: {
                foodName: this.props.item.itemName,
                foodItemId: this.props.item.itemId,
                seat: this.props.seat,
                unitPrice: this.props.item.unitPrice, 
                imageUrl: this.props.item.imageUrl,
                value: 0,
            }
        }

        // console.log("inside constructor");
    }

    componentDidMount() {
        if(this.props.foodArray.length !== 0) {
            this.props.foodArray.map((item) => {
                if(this.props.item.itemId === item.foodItemId && item.value !== 0 && this.state.food.seat === item.seat) {
                    this.setState({
                        food: { 
                            foodName: item.itemName,
                            foodItemId: item.foodItemId,
                            seat: item.seat,
                            unitPrice: item.unitPrice, 
                            imageUrl: item.imageUrl,
                            value: item.value,
                        }
                    })
                } 
            })
        }
    }

    increase = () => {
        this.setState({
            food:{
                foodName: this.props.item.itemName,
                foodItemId: this.state.food.foodItemId, 
                seat: this.state.food.seat,
                unitPrice: this.props.item.unitPrice, 
                imageUrl: this.props.item.imageUrl,
                value: this.state.food.value + 1, 
            }
        })
        this.props.increment(this.state.food);
        // let socket = socketIO('http://10.10.3.91:4000');
        // console.log('increase', this.state.food)
        socket.emit("decreaseAmount", {itemId: this.state.food.foodItemId})
    }

    decrease = () => {
        if (this.state.food.value > 0) {
            this.setState({
                food: {
                    foodName: this.props.item.itemName,
                    foodItemId: this.state.food.foodItemId,
                    seat: this.state.food.seat,
                    unitPrice: this.props.item.unitPrice, 
                    imageUrl: this.props.item.imageUrl,
                    value: this.state.food.value - 1,
                }
            })
        
            this.props.decrement(this.state.food)
            // let socket = socketIO('http://10.10.3.91:4000');
            socket.emit("increaseAmount", {itemId: this.state.food.foodItemId})
        }
    }

    
    render() {
        const { seat } = this.props;
        
        return (
            <View style={styles.view}>
                <Text style={styles.text}>Seat No: {seat}</Text>
                <View>
                    <View style={ this.state.food.value !== 0 ? {width: 75, margin: 5, visibility: 'visible' } : { display: 'none' } }>
                        <View style={styles.grid}>
                            <View style={styles.width}>
                                <Button 
                                    title='-'
                                    color='orange'
                                    onPress={() => this.decrease()}
                                />
                            </View>
                            <Text style={styles.text}>{this.state.food.value}</Text> 
                            <View style={styles.width}>
                                <Button 
                                    title='+'
                                    color='orange'
                                    onPress={() => this.increase()}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={ this.state.food.value === 0 ? { width: 75, margin: 5, visibility: 'visible' } : { display: 'none' }}>
                        <Button 
                            title='Add'
                            color='orange'
                            onPress={() => this.increase()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: { 
        flexDirection: 'row',
        marginBottom: 5
    },
    grid: {
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        margin: 5,
        marginTop: 12
    },
    width: {
        width: 25
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
      increment: (data) => dispatch({type: 'INCREMENT', data}),
      decrement: (data) => dispatch({type: 'DECREMENT', data})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSeat)
