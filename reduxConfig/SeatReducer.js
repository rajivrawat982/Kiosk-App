import { ADD_SEAT, CLEAR_SEATS, INITIAL_SEATS, REMOVE_SEAT,UPDATE_SEATS } from './actionTypes';
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
                userSelectedSeats: [...state.userSelectedSeats, action.payload]
            }
        case REMOVE_SEAT:
            let newArr = [...state.userSelectedSeats.filter((elem) => {
                return elem != action.payload;
            })]
            return {
                ...state,
                userSelectedSeats: newArr
            }

        case INITIAL_SEATS: 
            return {
                ...state ,
                seats: action.payload
            }
        case UPDATE_SEATS: 
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