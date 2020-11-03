import { createStore } from 'redux';
import { seatReducer } from "./SeatReducer";

const store = createStore(seatReducer);

export default store;