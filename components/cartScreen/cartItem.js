import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'

class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            food: {
                foodItemId: this.props.item.foodItemId,
                seat: this.props.item.seat,
                unitPrice: this.props.item.unitPrice, 
                imageUrl: this.props.item.imageUrl,
                value: this.props.item.value,
            },
        }
    }

    increase = () => {
        this.setState({
            food:{
                foodItemId: this.state.food.foodItemId,
                seat: this.state.food.seat,
                unitPrice: this.props.item.unitPrice, 
                imageUrl: this.props.item.imageUrl,
                value: this.state.food.value + 1, 
            },
        })
        this.props.increment(this.state.food)
    }

    decrease = () => {
        if (this.state.food.value >= 0) {
            this.setState({
                food: { 
                    foodItemId: this.state.food.foodItemId,
                    seat: this.state.food.seat,
                    unitPrice: this.props.item.unitPrice, 
                    imageUrl: this.props.item.imageUrl,
                    value: this.state.food.value - 1,
                },
            })
            this.props.decrement(this.state.food)
        }
    }

    render() {
        const { item } = this.props;
        console.log(item)
        return (
            <View style={styles.view}>
                <View style={styles.images}>
                    <Image style={styles.image} source={{uri: item.imageUrl}} />
                </View>
                <View style={styles.seatView}>
                    <View>
                        <Text style={styles.seatNoAndCost}>Name: {this.state.food.total}</Text>
                        <Text style={styles.seatNoAndCost}>Seat No: {item.seat}</Text>
                    </View>
                    <View style={ this.state.food.value !== 0 ? { width: 75, margin: 5, visibility: 'visible' } : { display: 'none' }}>
                        <View style={styles.flex}>
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
        width: 340,
        borderRadius: 10,
        flexDirection: 'row',
        margin: 10
    },
    seatView: {
        flexDirection: 'row',
        margin: 10
    },
    flex: {
        flexDirection: 'row',
        // margin: 4
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
    seatNoAndCost: {
        fontSize: 16, 
    },
    width: {
        width: 25
    }
})

const mapStateToProps = (state) => {
    return {
        total: state.foodReducer,
     }
 }

const mapDispatchToProps = dispatch => {
     return {
       increment: (data) => dispatch({type: 'INCREMENT', data}),
       decrement: (data) => dispatch({type: 'DECREMENT', data}),
     }
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(CartItem);