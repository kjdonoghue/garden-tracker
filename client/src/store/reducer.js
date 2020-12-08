const initialState = {
    zone: "",
    isGuest: false,
    isAuth: false
}

const reducer = (state= initialState, action) => {

    if (action.type == "LOGGED_IN") {
        return {...state,
            isAuth: true
        }
    } else {
        return state
    }
}


export default reducer