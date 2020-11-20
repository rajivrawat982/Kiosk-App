const initialstate = {
    foodArray: []
}

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'INCREMENT':
            if (state.foodArray.length() === 0) {
                return {
                    ...state, 
                    foodArray: [...state.foodArray , action.data]      
                }
            } else {
                return state.foodArray.map(product => {
                    if (product.foodItem === action.data.foodItem && product.seat === action.data.seat) {
                        return {...product, value: action.data.value}
                        };
                        return product;
                });
                }
        case 'DECREMENT':
                
        
    
        default:
            return state;
    }
}

export default reducer;