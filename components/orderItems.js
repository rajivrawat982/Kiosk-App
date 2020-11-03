import React, { Component } from 'react'
import { StyleSheet, View, Text, Image  } from 'react-native';
import OrderSeat from './orderSeat'

class OrderItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seats: [],
            foodQuantity: []
        }
    }

    componentDidMount() {
        this.setState({
            seats: JSON.parse(localStorage.getItem('seat')),
        })
    }


    increaseQuantity = () => {
        
    }

    render() {
        const { item } = this.props;
        const { seats } = this.state;
        console.log(this.state.seats)
        return (
            <View style={styles.view}>
                <View style={styles.grid}>
                    <View></View>
                    <Image 
                        style={styles.image}
                        source={item.imageUrl}
                    />
                    <Text style={styles.text}>{item.itemName}</Text>
                </View>
                {
                   seats.map((seat, index) => <OrderSeat seat={seat} key={index} item={item}/>)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    view: {
        borderWidth: 1,
        width: 500,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        margin: 'auto'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: "180px 70px 150px",
        marginTop: 20
    }
})


export default OrderItems
