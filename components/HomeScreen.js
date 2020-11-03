import React from 'react';
import { Image, StyleSheet, Button, View } from 'react-native' 


function HomeScreen ({navigation}) {
  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={require('../assets/logo.png')} 
      />
      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate('seats')}
          title='Start'
          color='orange'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // view: {
  //   alignItems: 'center'
  // },
  // image: {
  //   width: 500,
  //   height: 500,
  // },
  // button: {
  //   width: '10%',
  //   flex: 1,
  //   alignItems: 'center',
  //   padding: '10px 43px 10px 43px'
  // }
})

export default HomeScreen; 