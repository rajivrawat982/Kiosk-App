import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SeatFood from './seatFood';

const width = Dimensions.get('window').width;

class CartScreen extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            listOfItems: [],
        }
    }

    componentDidMount() {
        var response = this.separateSeatsFoodArray();

        this.setState({
            listOfItems: response,
        },() => {console.log("list", this.state)});

        
    }

    //trying to improve cart functionality using below function
    separateSeatsFoodArray = () => {
        var seats = this.props.seats;
        var result = [];

        for (let i = 0; i < seats.length; i++) {
            var seatFoodobject = {};
            seatFoodobject[seats[i]] = []
            
            this.props.foodArray.forEach(element => {
                if(element.seat === seats[i]) {
                    seatFoodobject[seats[i]].push(element);
                }
            });
            result.push(seatFoodobject);
        }

        return  result;  
    }

    render() {
        const { listOfItems } = this.state;
        // console.log(listOfItems);
        return(
            <View style={styles.process}>
                <ScrollView>
                    <View style={styles.seatsFood}>
                        { listOfItems.length != 0 ?
                            listOfItems.map((item, index) => <SeatFood key={index} seatfoodDetails={item}></SeatFood>)
                        : <Text></Text>}
                        
                    </View>
                </ScrollView>

                <View style={styles.payment} >
                    <View style={styles.paymentdetail}>
                        <View>
                            <Text>Bill Details</Text>
                        </View>
                        <View>
                            <Text>{`item Total                  `}  <FontAwesome5  name={'rupee-sign'} size={12}/> {this.props.total} </Text>
                            <Text>{`Taxes and Charges   `} <FontAwesome5  name={'rupee-sign'} size={12}/> {this.props.total*0.1}</Text>
                        </View>
                        
                        </View>
                        <View>
                            <Button
                                title='proceed to pay '
                                color='orange'
                                // onPress={() => console.log(this.props.food.total)}
                            />
                        </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    seatsFood: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly' 
    },
    process: {
        flex: 1,
        margin: 10,
    },
    payment: {
        position:"relative",
        backgroundColor: '#ffe89c',
        width: width,
        // alignItems: "center",
        justifyContent: 'flex-start',
        alignSelf: "center",
        // padding: 20,
    },
    paymentdetail: {
        width: width/3,
        backgroundColor: 'white',
        marginLeft: 10,
        padding: 5
    }
})

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        seats: state.seatReducer.userSelectedSeats,
        foodArray: state.foodReducer.foodArray,
        total: state.foodReducer.total
    }
}
 
 
 export default connect(mapStateToProps)(CartScreen);
