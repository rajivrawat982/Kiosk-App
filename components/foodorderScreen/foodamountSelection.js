import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, Dimensions  } from 'react-native';
import OrderSeat from './orderSeat';
import { connect } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
            <View style={styles.outerContainer}>
                <View>
                    <Image 
                        style={styles.image}
                        source={{uri:item.imageUrl}}
                    />
                </View>
                <Text>{item.itemName}</Text>
                <Text><FontAwesome5Icon name={'rupee-sign'}/>{item.unitPrice}</Text>
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
    outerContainer: {
        flexDirection: 'column',
        borderWidth: 1,
        width: width/4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    text: {
        fontSize: 16,
        margin: 'auto'
    },
    button: {
        position: "absolute",
        bottom: 0,
        borderRadius: 10,
        width: 100,
        // marginLeft: 73,
        
    },
    seats: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
