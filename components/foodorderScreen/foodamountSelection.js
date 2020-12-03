import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, Dimensions  } from 'react-native';
import OrderSeat from './orderSeat';
import { connect } from 'react-redux';

const {width,height} = Dimensions.get('window')

class OrderItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seats: []
        }
    }

    componentDidMount() {
        this.setState({
            seats: this.props.userSelectedSeats
        })
    }


    render() {
        const { item } = this.props;
        const { seats } = this.state;

        return (
            <View style={styles.view}>
                <View>
                    <Image 
                        style={styles.image}
                        source={{uri:item.imageUrl}}
                    />
                </View>
                <View style={styles.seats}>
                    <View style={styles.marginbottom}>
                        {
                            seats.map((seat, index) => <OrderSeat seat={seat} key={index} item={item}/>)
                        }
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title='Done'
                            color='orange'
                            onPress={ () => this.props.navigation.navigate('fooditems')}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 110,
        borderRadius: 10,
        margin: 2
    },
    view: {
        borderWidth: 1,
        width: 340,
        borderRadius: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        margin: 'auto'
    },
    button: {
        position: "absolute",
        bottom: 0,
        borderRadius: 10,
        width: 100,
        marginLeft: 73,
    },
    seats: {
        margin: 2,
    },
    marginbottom: {
        marginBottom: 30
    }
})
 
const mapStateToProps = (state) => {
    return {
        userSelectedSeats : state.seatReducer.userSelectedSeats
    }
}
 
export default connect(mapStateToProps)(OrderItems);
