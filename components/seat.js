import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Button, Text, View } from 'react-native';
import socketIO from 'socket.io-client';

import { connect } from 'react-redux';

let buttonColor = (data , userSelectedSeats) => {
        if(data.status === 1 ) {
            return "#FFA500";
        } else if (data.selected === 1  && !userSelectedSeats.includes(data.seatNumber)) {
            return '#A9A9A9';   //dark gray if seat is already selected by other user
        } else if (data.selected === 1 && userSelectedSeats.includes(data.seatNumber)) {
            return '#00FF00';  //green for selected seat
        } else if (data.status === 0 && data.selected ===0) {
            return '#D3D3D3';
        } 
    }


class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: buttonColor(this.props.data, this.props.userSelectedSeats)
        }

        this.disableCheck = this.disableCheck.bind(this)
        
    }

    sendData = (data) => {
        console.log(data.seatNumber);

        if (this.props.userSelectedSeats.includes(data.seatNumber)) {
            console.log("entering to remove seat")
            this.props.removeSeat(data.seatNumber);
            let socket = socketIO('http://10.10.3.91:4000');
            socket.emit("seatSelected", {seatNumber: data.seatNumber, selected: 0})
        } else {
            this.props.addSeat(data.seatNumber);
            let socket = socketIO('http://10.10.3.91:4000');
            socket.emit("seatSelected", {seatNumber: data.seatNumber, selected: 1});
            //this.props.receivedData()
        }

        // this.setState({
        //     backgroundColor: buttonColor(this.props.data, this.props.userSelectedSeats)
        // })
        // console.log(this.state.backgroundColor)
    
    } 

   
      
    disableCheck (data) {
        if (data.status == 1 ) {
            return true;
        } else if (data.selected == 1 && this.props.userSelectedSeats.includes(data.seatNumber)){
            return false;
        } else if (data.selected == 1  && !this.props.userSelectedSeats.includes(data.seatNumber)) {
            return true;
        }
      }

    render() {
        const { data} = this.props;

        this.state = {
            backgroundColor: buttonColor(this.props.data, this.props.userSelectedSeats)
        }

        return (

            <View>
            <TouchableOpacity style={[styles.border, {backgroundColor: this.state.backgroundColor}]} disabled={this.disableCheck(data)} onPress={() => this.sendData(data)}>
                {/* <Button 
                    //disabled={disableCheck(data)} 
                    // color={(data.seatStatus ===1  || (data.seatSelected ===1  && !this.state.userSelectedSeat.includes(data.seatNumber))) ? '#A9A9A9' : 
                    // (data.seatSelected === 1 && this.state.userSelectedSeat.includes(data.seatNumber)) ? '#00FF00' : '#D3D3D3' }
                    color={this.props.userSelectedSeats.includes(data.seatNumber) ? 'green' : data.status == 1 ? 'red' : 'gray'}
                    title={data.seatNumber + ''} 
                    
                /> */}
                <Text color={this.props.userSelectedSeats.includes(data.seatNumber) ? 'green' : data.status == 1 ? 'red' : 'gray'}>{data.seatNumber+ ''}</Text>
            </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    border: {
        width: 50,
        marginBottom: 30
    }
});


const mapStateToProps = (state) => {
    return {
        userSelectedSeats: state.seatReducer.userSelectedSeats
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSeat: (seatNumber) => dispatch({type: 'ADD_SEAT', payload: seatNumber}),
        removeSeat: (seatNumber) => dispatch({type: 'REMOVE_SEAT', payload: seatNumber})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seat);