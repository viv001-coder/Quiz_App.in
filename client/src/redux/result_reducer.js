import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        result : []
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;

            // Ensure array has enough length
            if(state.result.length <= trace) {
                state.result.length = trace + 1;
            }

            // Toggle selection: if same option clicked, clear it
            if(state.result[trace] === checked) {
                state.result[trace] = null;
            } else {
                state.result[trace] = checked;
            }
        },
        resetResultAction : () => {
            return {
                userId : null,
                result : []
            }
        }
    }
})

export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultReducer.actions;
export default resultReducer.reducer;
