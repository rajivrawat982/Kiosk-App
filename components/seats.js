import React, {Component} from 'react';
import { StyleSheet, View, Button , ScrollView, Text} from 'react-native';
import Seat from './seat';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';
import { loadInitialSeatsSocket, clearUserSeats, getUpdatedState } from '../reduxConfig/actions';

const mapStateToProps = (state) => {
  //console.log(state);
  return {
      userSelectedSeats: state.userSelectedSeats,
      serverSeats: state.seats
  }
}



class seats extends Component {
  constructor(props) {
    super(props)
    

   this.state = {
          list: []
        }
  
    
    this.recevedData = this.recevedData.bind(this);

    
  }

  componentDidMount () {
    const {dispatch} = this.props;
    const socket = socketIO("http://10.10.3.91:4000");
    dispatch(loadInitialSeatsSocket(socket));
      this.setState ({
        list: this.props.serverSeats
      })

  }

  // componentDidMount() {
  //   const socket = socketIO("http://10.10.3.91:4000")
  //   socket.on("getAllseats", (data) => {
  //       this.setState({
  //           list: data
  //       })
  //   })
  // }

  // disableCheck = (data) => {
  //   if (data.seatStatus === 1  || (data.seatSelected === 1  && !this.props.userSelectedSeats.includes(data.seatNumber))) {
  //       return true;
  //   } else if (data.seatSelected === 1 && this.props.userSelectedSeats.includes(data.seatNumber)){
  //       return false;
  //   }
  // }
  
  recevedData = () => {
    const socket = socketIO("http://10.10.3.91:4000")
    // socket.on("updatedSeatSelection", (data) => {
    //   //console.log(data)
    //   this.setState({
    //     list: data
    //   })
      
    // })
    
    this.props.dispatch(getUpdatedState(socket));
    this.setState({
      list: this.props.serverSeats
    })

  }

  render () { 
    const { list } = this.state;
    const { navigation } = this.props
    
    return (
      <View>
        <Text>Hello SEats</Text>
        <ScrollView>
        <View style={styles.grid}>
          <View style={styles.border}>
              {
                  list.map((items, index) => {
                    if(index >= 39 && index < 54)  {
                      return <Seat data={items} key={index} recevedData={this.recevedData} disableCheck={this.disableCheck}/>
                    }
                  })
              }
          </View>
          <View style={styles.reverseMargin}>
              {
                  list.map((items, index) => {
                    if(index >= 27 && index < 39) {
                      return <Seat data={items} key={index} recevedData={this.recevedData} disableCheck={this.disableCheck}/>
                    }
                  })
              }
          </View>
          <View style={styles.border}>
            {
                  list.map((items, index) => {
                    if(index >= 15 && index < 27) {
                      return <Seat data={items} key={index} recevedData={this.recevedData} disableCheck={this.disableCheck}/>
                    }
                  })
            }
          </View>
          <View style={styles.reverse}>
              {
                  list.map((items, index) => {
                    if(index < 15){
                      return <Seat data={items} key={index} recevedData={this.recevedData} disableCheck={this.disableCheck}/>
                    }
                  })
              }
          </View>
        </View>
        {/* <View style={styles.button} >
          <Button
            title="Continue" 
            onPress={() => navigation.navigate('fooditems')}
            color='orange'
          />
        </View> */}
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




export default connect(mapStateToProps)(seats);