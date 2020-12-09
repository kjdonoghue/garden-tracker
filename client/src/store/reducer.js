const initialState = {
    zone: '',
    primary_garden: '',
    isGuest: false,
    isAuth: false
}

const reducer = (state= initialState, action) => {

    if (action.type == 'LOGGED_IN') {
        return {...state,
            isAuth: true
        }
    } else if (action.type == 'SET_GARDEN') {
        return{...state,
            primary_garden: action.payload
        }
    }  else if (action.type == 'SET_ZONE') {
        return{...state,
            zone: action.payload
        }
    } else {
        return state
    }
}


export default reducer