import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socketio",
    initialState:{
        socket:null
    },
    reducers:{
        /**
         * Set the socket.io instance to the state.
         * @param {state} The current state of the socketSlice.
         * @param {action} The action to dispatch, containing the socket.io instance as its payload.
         * @returns {void}
         */
        setSocket:(state,action) => {
            state.socket = action.payload;
        }

        /**
         * Set the socket.io instance to the state.
         * This action is used to set the socket.io instance to the state when the user connects to the socket.
         * @param {state} The current state of the socketSlice.
         * @param {action} The action to dispatch, containing the socket.io instance as its payload.
         * @example
         * dispatch(setSocket(socket));
         * @returns {void}
         */
    }
});
export const {setSocket} = socketSlice.actions;
export default socketSlice.reducer;