import React, {Component} from 'react';
import { StyleSheet, View, Button , ScrollView, Text} from 'react-native';
import Seat from './seat';
import socketIO from 'socket.io-client';
import { connect, connectAdvanced } from 'react-redux';
import { loadInitialSeatsSocket, clearUserSeats, getUpdatedState, initialSeats ,updateSeats} from '../reduxConfig/actions';
import axios from 'axios';


class seats extends Component {
  constructor(props) {
    super(props)
   this.state = {
          list: []
        }

  //this.receivedData = this.receivedData.bind(this);  
  }


  componentDidMount() {
    axios.get("http://10.10.3.91:4000/api/allseats").then(
      response => {
        this.setState({
          list: response.data
        })
      }
    ).then(this.updatingReduxSeats)
    
    const socket = socketIO("http://10.10.3.91:4000")
    socket.on('updatedSeatSelection', res => {
      this.props.lesscheck(res);
      
      this.setState({                                           //might be this not run in sync so i have to use promise so after action dispatch properly we use setState
        list: this.props.serverSeats
      })
      console.log("updated socket listr", this.state.list);
    })
  }

  updatingReduxSeats = () => {
    this.props.apiSeats(this.state.list);
    this.setState({                                           //might be this not run in sync so i have to use promise so after action dispatch properly we use setState
      list: this.props.serverSeats
    })
  }

  
  // receivedData = () => {
  //   const socket = socketIO("http://10.10.3.91:4000")
  //   //this.props.updatedSeats(socket);

  //   // this.setState({
  //   //   list: this.props.serverSeats
  //   // })
  // }

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
            onPress={() => navigation.navigate('fooditems')}
            color='orange'
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reverse: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginLeft: 50
  },
    border: {
      marginLeft: 50
    },
    reverseMargin: {
      display: 'flex',
      flexDirection: 'column-reverse',
      marginLeft: 50
    },
    grid: {
      display: "flex",
      flexDirection: 'row',
      marginLeft: 20
    }
//     text: {
//       textAlign: 'center',
//       fontSize: '21px'
//     },
//     button: {
//       width: '10%',
//       marginLeft: '59%'
//     }
});

const mapStateToProps = (state) => {
  return {
      userSelectedSeats: state.userSelectedSeats,
      serverSeats: state.seats
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