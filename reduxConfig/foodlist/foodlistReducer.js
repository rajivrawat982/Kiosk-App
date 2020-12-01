import {INITIAL_FOODLIST,  UPDATE_FOODLIST , INCREMENT , DECREMENT} from './foodActionTypes'


const initialState = {
    foodlist: [],
    foodArray: [],
    total: 0
}



const foodReducer = (state = initialState , action ) => {
    switch (action.type) {
        case  INITIAL_FOODLIST:
            return {
                ...state ,
                foodlist: action.payload
            }
        case UPDATE_FOODLIST:
            return {
                ...state ,
                foodlist: action.foodlist
            }
        case INCREMENT:
            console.log("increnerjendvn", action.data);
            if(state.foodArray.length !== 0 && action.data.value !== 0) {
                let array = state.foodArray.map((item) => item.seat === action.data.seat && item.foodItemId === action.data.foodItemId ? 
                                                                        { ...item, value: item.value + 1} :  item);
                console.log("value update", array);
                return { ...state, foodArray: array, total: state.total + action.data.unitPrice}
            } else if (action.data.value === 0){
                console.log("first entry");
                return {...state, foodArray: [ ...state.foodArray, {...action.data, value: 1 }], total: state.total + action.data.unitPrice}
            } else {
                return state
            }
        case DECREMENT:
            if(action.data.value >= 0) {
                let array = state.foodArray.map((item) => item.seat === action.data.seat && item.foodItemId === action.data.foodItemId ? 
                { ...item, value: item.value - 1}:  item)  
                    return { ...state, foodArray: array.filter((item) => item.value >= 0 && item.value === 0), total: state.total - action.data.unitPrice}
            }
        default: 
            return state;
    }
}

// const foodReducer = (state = initialState, action) => {
//     if(action.type === 'INCREMENT') {
//         if(state.foodArray.length !== 0 && action.data.value !== 0) {
//             let array = state.foodArray.map((item) => item.seat === action.data.seat && item.foodItemId === action.data.foodItemId ? 
//             { ...item, value: action.data.value + 1}:  item)
//             return { ...state, foodArray: array.filter((item) => item.value === 0), total: state.total + action.data.unitPrice}
//         } else if (action.data.value === 0){
//             return {...state, foodArray: [ ...state.foodArray, {...action.data, value: 1 }], total: state.total + action.data.unitPrice}
//         } else {
//             return state
//         }
//     } else if(action.type === 'DECREMENT') {
//         if(action.data.value >= 0) {
//             let array = state.foodArray.map((item) => item.seat === action.data.seat && item.foodItemId === action.data.foodItemId ? 
//             { ...item, value: action.data.value - 1}:  item)  
//                 return { ...state, foodArray: array.filter((item) => item.value >= 0 && item.value === 0), total: state.total - action.data.unitPrice}
//         }
//     } else {
//         return state
//     }
// }

export default foodReducer;