import { SET_ERRORS, SET_FIELD_TOUCHED, SET_FIELD_VALUE, SET_RESET, SET_VALUES } from "./type";
import { getInitialState } from "./utils";

const reducer = (state, action) => {
    switch (action?.type) {
        case SET_VALUES:
            state.values = action.value;
            return { ...state }
        case SET_FIELD_VALUE:
            state.values[action.name] = action.value;
            return { ...state }
        case SET_FIELD_TOUCHED:
            state.touched[action.name] = action.value;
            return { ...state }
        case SET_ERRORS:
            state.isValid = action?.isValid;
            state.errors = action?.errors
            return { ...state }
        case SET_RESET:
            return getInitialState(action?.value)
        default:
            return state;
    }
}

export default reducer;