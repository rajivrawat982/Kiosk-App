import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import socketIO from 'socket.io-client';

import { connect } from 'react-redux';


//let user = []
class Seat extends Component {
    constructor(props) {
        super(props);
        this.buttonColor = this.buttonColor.bind(this)
    }

    sendData = (data) => {
        console.log(data.seatNumber);
        //const userSeats = this.props.userSelectedSeat;
        console.log(this.props.userSelectedSeats);
        // user.push(data)
        if(data.selected === 0) {
            let socket = socketIO('http://10.10.3.91:4000');
            socket.emit("seatSelected", {seatNumber: data.seatNumber, selected: 1})
            this.props.recevedData()
            this.props.addSeat(data.seatNumber);
        } else if (this.props.userSelectedSeats.includes(data.seatNumber)) {
            let socket = socketIO('http://10.10.3.91:4000');
            socket.emit("seatSelected", {seatNumber: data.seatNumber, selected: 0})
            this.props.recevedData()
            this.props.removeSeat(data.seatNumber);
        }  
        //const duplicates = [...new Set(user)]
    
    }

    buttonColor (data) {
        if (data.seatStatus ===1  || (data.seatSelected ===1  && !this.state.userSelectedSeat.includes(data.seatNumber))) {
            return '#A9A9A9';   //dark gray if seat is already booked by other user
        } else if (data.seatSelected === 1 && this.state.userSelectedSeat.includes(data.seatNumber)) {
            return '#00FF00';  //green for selected seat
        } else if (data.seatStatus === 0 && data.seatSelected ===0) {
            return '#D3D3D3';
        }
    }
      


    render() {
        const { data} = this.props;
        function disableCheck (data) {
            if (data.seatStatus === 1  || (data.seatSelected === 1  && !this.props.userSelectedSeats.includes(data.seatNumber))) {
                return true;
            } else if (data.seatSelected === 1 && this.props.userSelectedSeats.includes(data.seatNumber)){
                return false;
            }
          }

        

        return (
            <TouchableOpacity style={styles.border} disabled={data.status === 1 ? true : false}>
                <Button 
                    disabled={disableCheck(data)} 
                    color={this.buttonColor(data)}
                    title={data.seatNumber + ''} 
                    onPress={() => this.sendData(data)}
                />
            </TouchableOpacity>
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
        userSelectedSeats: state.userSelectedSeats
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSeat: (seatNumber) => dispatch({type: 'ADD_SEAT', payload: seatNumber}),
        removeSeat: (seatNumber) => dispatch({type: 'REMOVE_SEAT', payload: seatNumber})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seat);