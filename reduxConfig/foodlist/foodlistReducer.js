import {INITIAL_FOODLIST,  UPDATE_FOODLIST , INCREMENT , DECREMENT , CLEAR_FOODARRAY} from './foodActionTypes'


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
            console.log("increment data in the reducer scene: ", action.data);
            if(state.foodArray.length !== 0 && action.data.value > 1) {
                let array = state.foodArray.map((item) => item.seat === action.data.seat && item.foodItemId === action.data.foodItemId ? 
                                                                        { ...item, value: item.value + 1} :  item);
                return { ...state, foodArray: array, total: state.total + action.data.unitPrice}
            } else if (action.data.value === 1){
                console.log("first entry", action.data);
                return {...state, foodArray: [ ...state.foodArray, action.data], total: state.total + action.data.unitPrice}
            } else {
                return state
            }
            
        case DECREMENT:
            // console.log('decrement data incoming', action.data);
            if(action.data.value > 0) {
                // console.log('decrement' , action.data.value);

                let array = state.foodArray.map((item) => (item.seat === action.data.seat && item.foodItemId === action.data.foodItemId) ? 
                { ...item, value: action.data.value - 1} :  item )  
                    return { ...state, foodArray: array.filter((item) => item.value >= 0 && item.value === 0), total: state.total - action.data.unitPrice}
            } else {

                // console.log('zero wala scene', action.data);
                // console.log('prev array ', state.foodArray);

                let array = [];
                state.foodArray.forEach(food => {
                    // console.log("food" , food);
                    // console.log("action.data" , action.data);
                    if(action.data.foodItemId === food.foodItemId && action.data.seat === food.seat) {
                        console.log("entered in if loop");
                    } else {
                        array.push(food);
                    }
                    // console.log(array);
                });
                
                // console.log('array' , array);

                return {...state, foodArray: array , total: state.total - action.data.unitPrice}
            }

        case CLEAR_FOODARRAY:
            return {...state , foodArray: [] , total: 0}

        default: 
            return state;
    }
}


export default foodReducer;