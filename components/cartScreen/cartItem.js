import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { socket } from "../../SocketComponent";


const width = Dimensions.get('window').width;

class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            food: {
                foodName: this.props.item.foodName,
                foodItemId: this.props.item.foodItemId,
                seat: this.props.item.seat,
                unitPrice: this.props.item.unitPrice, 
                imageUrl: this.props.item.imageUrl,
                value: this.props.item.value,
            },
        }
    }

    increase = () => {
        this.props.foodlist.forEach(element => {
            if(element.itemId == this.state.food.foodItemId) {
                if(element.amountAvailable > 0) {
                    this.setState({
                        food:{
                            foodName: this.props.item.itemName,
                            foodItemId: this.state.food.foodItemId, 
                            seat: this.state.food.seat,
                            unitPrice: this.props.item.unitPrice, 
                            imageUrl: this.props.item.imageUrl,
                            value: this.state.food.value + 1, 
                        }
                    } , () => this.props.increment(this.state.food));
                    
                    
                    socket.emit("decreaseAmount", {itemId: this.state.food.foodItemId});
                    
                } else if (element.amountAvailable == 0) {
                    alert(`No more ${element.itemName} available`);
                }
            }
        });

    }

    decrease = () => {
        console.log('curent food value', this.state.food.value)
        if (this.state.food.value >=0) {
            this.setState({
                food: { 
                    foodName: this.props.item.foodName,
                    foodItemId: this.state.food.foodItemId,
                    seat: this.state.food.seat,
                    unitPrice: this.props.item.unitPrice, 
                    imageUrl: this.props.item.imageUrl,
                    value: this.state.food.value - 1,
                },
            }, () => this.props.decrement(this.state.food));
            
            socket.emit("increaseAmount", {itemId: this.state.food.foodItemId})
        }
        // } else if (this.state.food.value == 0) {
        //     this.props.remove(this.state.food);
        // }
    }

    render() {
        const { item } = this.props;
        // console.log(item)
        return (
            <View style={styles.view}>
                <View style={styles.images}>
                    <Image style={styles.image} source={{uri: item.imageUrl}} />
                </View>
                <View style={styles.seatView}>
                    <View>
                        <Text style={styles.seatNoAndCost}>{this.state.food.foodName}</Text>
                        {/* <Text style={styles.seatNoAndCost}>Seat No: {item.seat}</Text> */}
                    </View>
                    <View style={ this.state.food.value !== 0 ? { width: 75, margin: 5, visibility: 'visible' } : { display: 'none' }}>
                        <View style={styles.addsubtract}>
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
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: width/3,
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#e4e7ed'
    },
    seatView: {
        flexDirection: 'column',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addsubtract: {
        flexDirection: 'row',
        margin: 4,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        margin: 4
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 2
    },
    width: {
        width: 25
    }
})

const mapStateToProps = (state) => {
    return {
        total: state.foodReducer.total,
        foodlist: state.foodReducer.foodlist
     }
 }

const mapDispatchToProps = dispatch => {
     return {
       increment: (data) => dispatch({type: 'INCREMENT', data}),
       decrement: (data) => dispatch({type: 'DECREMENT', data}),
       remove: (data) => dispatch({type: 'REMOVE' , data})
     }
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(CartItem);