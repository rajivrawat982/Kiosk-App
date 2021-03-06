import React from 'react';
import { StyleSheet, View, Text, Image, Button, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

const width = Dimensions.get('window').width;


class FoodItem extends React.Component {

    order = (data) => {
        this.props.foodItemList(data)
        this.props.navigation.navigate('orderfood')
    }

    onClickAddCart = (item) => {
        
        if (item.amountAvailable !== 0) {
            this.order(item);
        } else {
            alert('item not Available')
        }
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
                    <Text style={styles.text} >
                        <FontAwesome5  name={'rupee-sign'} size={15}/>
                        {` ${item.unitPrice}`}
                    </Text>
                    <Text style={styles.text} >Available: {item.amountAvailable}</Text>
                    
                </View>

                <View>
                    <TouchableOpacity  style={ item.amountAvailable !== 0 ? styles.itemAvailable : styles.itemNotAvailable} 
                                       onPress = {() => {this.onClickAddCart(item)}}>

                        <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>{item.amountAvailable !==0 ? `Add Cart` : `Available soon`}</Text>
                        <View style={{width:10}} />
                    
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.addCart}>
                        <View style={ item.amountAvailable !== 0 ? {visibility: 'visible' }:{ display: 'none' } }>
                            <Button 
                                onPress={() => this.order(item)}
                                title="Add Cart"
                                color="orange"
                            />
                        </View>
                        <View style={ item.amountAvailable === 0 ? {  visibility: 'visible'}:{ display: 'none' }}>
                            <Button 
                                onPress={() => alert("Not Available")}
                                title="Not Available"
                                color="red"
                            />
                        </View>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: (width/3-100) - 20,
        height: 150,
        borderRadius: 10,
    },
    border: {
        // borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        flexDirection: 'column',
        width: width/3-100,
        backgroundColor: '#f5f7fa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        margin: 2
    },
    images: {
        margin: 2
    },
    items: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    itemAvailable: {
        width:(width/4)-40,
        // backgroundColor:'#33c37d',
        backgroundColor: '#ffac05',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        borderRadius:5,
        padding:4
    },
    itemNotAvailable: {
        width:(width/4)-40,
        backgroundColor:'#babfbb',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        borderRadius:5,
        padding:4
    },

    
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
