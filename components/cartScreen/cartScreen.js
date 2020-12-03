import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView} from 'react-native';
import { connect } from 'react-redux';
// import seat from '../seat';
import SeatFood from './seatFood';

class CartScreen extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            listOfItems: [],
        }
    }

    componentDidMount() {
        var response = this.trialFunction();
        // console.log("rersdsd", response);
        
        this.setState({
            listOfItems: response,
        },() => {console.log("list", this.state)});

        
    }

    //trying to improve cart functionality using below function
    trialFunction = () => {
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
        console.log(result);
        return  result;   
    }

    render() {
        const { listOfItems } = this.state;
        console.log(listOfItems);
        return(
            <View style={styles.process}>
                <ScrollView>
                    <View style={styles.seatsFood}>
                        { listOfItems.length != 0 ?
                            listOfItems.map((item, index) => <SeatFood key={index} seatfoodDetails={item}></SeatFood>)
                        : <Text></Text>}
                        
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
    seatsFood: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly' 
    },
    button: {
        width: 200,
        marginLeft: 130
    },
    process: {
        flex: 1,
        margin: 10,
        // alignItems: 'center',
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
