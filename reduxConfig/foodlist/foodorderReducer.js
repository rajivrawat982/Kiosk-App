import { FOODITEM } from "./foodActionTypes";

const initialState = {
    foodItemsArray: []
}

const foodorderReducer = (state = initialState, action) => {
    if(action.type === FOODITEM) {
        return {...state, foodItemsArray: [ ...state.foodItemsArray.filter((item) => item.itemId !== action.data.itemId), action.data ]}
    } else {
        return state
    }
}

export default foodorderReducer;