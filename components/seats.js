import React, {Component} from 'react';
import { StyleSheet, View, Button , ScrollView, Text, Dimensions} from 'react-native';
import Seat from './seat';
import { socket } from '../SocketComponent';
// import socketIO from 'socket.io-client';
import { connect, connectAdvanced } from 'react-redux';
import { loadInitialSeatsSocket, clearUserSeats, getUpdatedState, initialSeats ,updateSeats} from '../reduxConfig/actions';
import axios from 'axios';

let width = Dimensions.get('window').width;


class seats extends Component {
  constructor(props) {
    super(props)
   this.state = {
          list: []
        }
  
    console.log("seats screen constructor")
  }


  componentDidMount() {
    axios.get("http://10.10.3.91:4000/api/allseats").then(
      response => {
        this.setState({
          list: response.data
        })
      }
    ).then(this.updatingReduxSeats)
    
    // const socket = socketIO("http://10.10.3.91:4000")
    socket.on('updatedSeatSelection', res => {
      this.props.lesscheck(res);
      
      this.setState({                                           //might be this not run in sync so i have to use promise so after action dispatch properly we use setState
        list: this.props.serverSeats
      })
      //console.log("updated socket list", this.state.list);
    })

    console.log("seats componentDidmount")
  }

  //clear redux store here in componentWillUnmount
  componentWillUnmount() {
    console.log("seats component is unmounting")
  }

  updatingReduxSeats = () => {
    this.props.apiSeats(this.state.list);
    this.setState({                                           //might be this not run in sync so i have to use promise so after action dispatch properly we use setState
      list: this.props.serverSeats
    })
  }

  continueOnFoodScreen = () => {
    if(this.props.userSelectedSeats.length == 0) {
      alert('Select your seats first')
    } else {
      this.props.navigation.navigate('fooditems');
    }
  }
  

  render () { 
    const { list } = this.state;
    const { navigation } = this.props
    
    return (
      <View>
        <ScrollView>
        <View style={styles.grid}>
          <View style={styles.border}>
              {
                  list.map((items, index) => {
                    if(index >= 39 && index < 54)  {
                      return <Seat data={items} key={index} receivedData={this.receivedData} disableCheck={this.disableCheck}/>
                    }
                  })
              }
          </View>
          <View style={styles.reverseMargin}>
              {
                  list.map((items, index) => {
                    if(index >= 27 && index < 39) {
                      return <Seat data={items} key={index} receivedData={this.receivedData} disableCheck={this.disableCheck}/>
                    }
                  })
              }
          </View>
          <View style={styles.border}>
            {
                  list.map((items, index) => {
                    if(index >= 15 && index < 27) {
                      return <Seat data={items} key={index} receivedData={this.receivedData} disableCheck={this.disableCheck}/>
                    }
                  })
            }
          </View>
          <View style={styles.reverse}>
              {
                  list.map((items, index) => {
                    if(index < 15){
                      return <Seat data={items} key={index} receivedData={this.receivedData} disableCheck={this.disableCheck}/>
                    }
                  })
              }
          </View>
        </View>
        <View style={styles.button} >
          <Button
            title="Continue" 
            onPress={() => this.continueOnFoodScreen()}
            color='orange'
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  reverse: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  border: {
    flex: 1,
    alignItems: 'center'
  },
  reverseMargin: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    // backgroundColor: 'blue',
    justifyContent: 'flex-end',
    borderRightColor: 'black'
    }
    
//     text: {
//       textAlign: 'center',
//       fontSize: '21px'
//     },
    // button: {
    //   width: '40%',
    //   marginLeft: '59%'
    // }
});

const mapStateToProps = (state) => {
  return {
      userSelectedSeats: state.seatReducer.userSelectedSeats,
      serverSeats: state.seatReducer.seats
  }
}


const mapDispatchToProps = dispatch => {
  return {
      updatedSeats: (socket) => dispatch(getUpdatedState(socket)),
      apiSeats: (seats) => dispatch(initialSeats(seats)),
      lesscheck: (seats) => dispatch(updateSeats(seats))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(seats);