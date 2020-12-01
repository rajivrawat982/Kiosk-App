import React from 'react';
import { StyleSheet, View, Text, Image, Button, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';

const {width,height} = Dimensions.get('window')

class FoodItem extends React.Component {

    order = (data) => {
        this.props.foodItemList(data)
        this.props.navigation.navigate('orderfood')
    }
    
    render() {
        const { item } = this.props;
        return (
            <View style={styles.border}>
                <View style={styles.images}>
                    <Image style={styles.image} source={{uri:item.imageUrl}} />
                </View>
                <View style={styles.items}>
                    <Text style={styles.text} >{item.itemName}</Text>
                    <Text style={styles.text} >Cost: {item.unitPrice}</Text>
                    <Text style={styles.text} >Available: {item.amountAvailable}</Text>
                    <View style={styles.addCart}>
                        <View style={ item.amountAvailable !== 0 ? { width: 100,  visibility: 'visible' }:{ display: 'none' } }>
                            <Button 
                                onPress={() => this.order(item)}
                                title="Add Cart"
                                color="orange"
                            />
                        </View>
                        <View style={ item.amountAvailable === 0 ? { width: 150, visibility: 'visible'}:{ display: 'none' }}>
                            <Button 
                                onPress={() => alert("Not Available")}
                                title="Not Available"
                                color="red"
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 110,
        borderRadius: 10,
    },
    border: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row',
        width: 350,
    },
    text: {
        fontSize: 16,
        margin: 2
    },
    images: {
        margin: 2
    },
    items: {
        margin: 5
    },
    addCart: {
        position: "absolute",
        bottom: 0,
    }
  })

// const mapStateToProps = (state) => {
//     return {
//         food: state
//      }
//  }
 
 const mapDispatchToProps = dispatch => {
     return {
       foodItemList: (data) => dispatch({type: 'FOODITEM', data}),
     }
 }
 
 
 export default connect(null, mapDispatchToProps)(FoodItem);
