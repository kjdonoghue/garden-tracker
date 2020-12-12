const initialState = {
    isAuth: false
}

const reducer = (state= initialState, action) => {

    if (action.type === 'LOGGED_IN') {
        return {...state,
            isAuth: true,
        }
    } else if (action.type === 'ON_LOGOUT') {
        return{...state,
            isAuth: false
        }
    } else {
        return state
    }
}


export default reducer