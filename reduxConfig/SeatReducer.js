import { ADD_SEAT, CLEAR_SEATS, INITIAL_SEATS, REMOVE_SEAT,UPDATE_SEATS } from './actionTypes';

/*----------order status is used for checking while clearing out redux store at any moment of time on unmounting 
set order status will be true when payment is done---------------------------*/
const initialstate = {
    userSelectedSeats: [],
    orderStatus: false,
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