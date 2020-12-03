import React, { Component } from 'react'
import { View , ScrollView , StyleSheet , Text, Dimensions} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CartItem from './cartItem';

const width = Dimensions.get('window').width;

class SeatFood extends Component {
    constructor(props) {
        super(props)
        
        //we are getting an object in prop so we are retrieving its value using below statement it return array 
        var foodArray = Object.values(this.props.seatfoodDetails);
        var seatArray = Object.keys(this.props.seatfoodDetails);

        this.state = {
            seat: seatArray[0],
            fooddetail: foodArray[0]
        }

        // console.log(this.state.fooddetail);
    }
    render() {
        return (
            <View style={styles.singleSeatFood}>
                <ScrollView>
                    <View style={styles.seatdetail}>
                        <View>
                            <FontAwesome5 name={'couch'} size={30}></FontAwesome5>
                        </View>
                        <View style={{marginLeft: 20}}>
                            <Text>Seat</Text>
                            <Text>{this.state.seat}</Text>
                        </View>
                    </View>
                    <View>
                        {
                            this.state.fooddetail.map((item, index) => <CartItem key={index} item={item} click={this.total} />)
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    singleSeatFood: {
        width: '40%',
        marginBottom: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seatdetail: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
})

export default SeatFood;
