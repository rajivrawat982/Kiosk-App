import { ADD_SEAT , CLEAR_SEATS, INITIAL_SEATS, REMOVE_SEAT, UPDATE_SEATS } from "./actionTypes"


export const AddSeat = (seatNumber) => {
    return {
        type: ADD_SEAT,
        payload: seatNumber,
    }
}

export const RemoveSeat = (seatNumber) => {
    return {
        type: REMOVE_SEAT,
        payload: seatNumber
    }
}

//used only by actons for sockets
export const initialSeats = (res) => ({
    type: INITIAL_SEATS,
    payload: res   
})

export const clearuserseats = () => {
   return { type: CLEAR_SEATS}
}

export const updateSeats = (res) => ({
    type: UPDATE_SEATS,
    seats: res
})


/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
// const socket = socketIO("http://10.10.3.91:4000");

// export const loadInitialSeatsSocket = (socket) => {
//     return (dispatch) => {
//         socket.on('getAllseats', (res) => {
//             dispatch(initialSeats(res));
//         })
//     }
// }

export const getUpdatedState = (socket) => {
    return (dispatch) => {
        socket.on('updatedSeatSelection' , (res) => {
            dispatch(updateSeats(res))
        })
    }
}

// export const clearUserSeats = () => {
//     return (dispatch) => {
//         dispatch(clearUserSeats());       
//     }
// }
