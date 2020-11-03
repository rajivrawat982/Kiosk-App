import React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux';
import { changeBackgroundColor} from './reduxConfig/actions';


const AnotherComponent = (props) => {
    
    return (
        <View style={{backgroundColor: props.backgroundColor}}>
                 <Button title="click me"></Button>   
        </View>
    )
}

const mapStateToProps = (state) => {
    const {backgroundColor} = state;
    return state; 
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeBackgroundColor: () => dispatch(changeBackgroundColor()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnotherComponent);