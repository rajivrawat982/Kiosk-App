import {INITIAL_FOODLIST,  UPDATE_FOODLIST } from './foodActionTypes'

export const initialFoodlist = (res) => ({
    type: INITIAL_FOODLIST,
    payload: res   
})



export const updateFoodlist = (res) => ({
    type: UPDATE_FOODLIST,
    foodlist: res
})



/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */


export const getUpdatedFoodlist = (socket) => {
    return (dispatch) => {
        socket.on('updatedFooddata' , (res) => {
            dispatch(updateFoodlist(res))
        })
    }
}