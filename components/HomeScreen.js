import axios from 'axios';
import React, { Component } from 'react';
import { Image, StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux';


class HomeScreen extends Component {

  componentDidMount() {

      //using this navigation event for seeing if user is on that screen or not if he is on screen below function do something for code, 
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      /*---------here might need to add some logic for checking selected seats in redux store [userSelectedSeats] because 
      we have to clear their selection in central server database--------*/
      if(this.props.userSelectedSeats.length !== 0) {

          //post request to clear multiple seats at a time 
          axios.post('http://10.10.3.91:4000/api/clearSeats', {
            seats: this.props.userSelectedSeats
          });
      }

      this.props.clearSeats();
    })
  }


  render() {
    return (
        <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../assets/logo.png')} 
        />
        <View style={styles.button}>
          <Button
            onPress={() => this.props.navigation.navigate('seats')}
            title='Start'
            color='orange'
          />
        </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  view: {
    alignItems: 'center'
  },
  // image: {
  //   width: 500,
  //   height: 500,
  // },
  // button: {
  //   width: '50%',
  //   flex: 1,
  //   alignItems: 'center',
  // }
})

const mapStateToProps = (state) => {
    return {
      userSelectedSeats: state.seatReducer.userSelectedSeats,
    }
}

const mapDispatchToProps = dispatch => {
  return {
      clearSeats: () => dispatch({type: 'CLEAR_SEATS'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);