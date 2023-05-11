const initialState = {
    isAuth: false,
    token: null,
    user: null,
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                role: action.payload.option,
                about: action.payload.about
            }
        case "signup":
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                role: action.payload.option,
                about: action.payload.about
            }
        case "logout":
            return {
                ...state,
                isAuth: false,
                token: null,
                role: null,
                about: null
            }
        // case "error":
        //     return {
        //         ...state,
        //         isAuth: false,
        //         token: null,
        //         user: null,
        //     }
        default:
            return state
    }
}