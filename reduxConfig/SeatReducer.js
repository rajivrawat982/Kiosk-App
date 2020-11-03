import { ADD_SEAT, CLEAR_SEATS, INITIAL_SEATS, REMOVE_SEAT } from './actionTypes';
import { combineReducers} from 'redux';
 
const initialstate = {
    userSelectedSeats: [],
    loading: false,
    seats: [], 
}


const seatReducer = (state = initialstate , action ) => {
    switch (action.type) {
        case ADD_SEAT:
            return {
                ...state ,
                userSelectedSeats: state.userSelectedSeats.concat(action.payload) 
            }
        case REMOVE_SEAT:
            return {
                ...state,
                userSelectedSeats: state.userSelectedSeats.splice(action.payload, 1)
            }

        case INITIAL_SEATS: 
            return {
                ...state ,
                seats: action.seats
            }
        case CLEAR_SEATS:
            return {
                ...state,
                userSelectedSeats: []
            }
        default:
                return state;
    }
}

export default seatReducer;