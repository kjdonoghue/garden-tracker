const initialState = {
    zone: '',
    primary_garden: '',
    new_garden: '',
    new_plant: '',
    isGuest: false,
    isAuth: false
}

const reducer = (state= initialState, action) => {

    if (action.type === 'LOGGED_IN') {
        return {...state,
            isAuth: true,
            isGuest: true,
        }
    } else if (action.type === 'SET_GARDEN') {
        return{...state,
            primary_garden: action.payload
        }
    }  else if (action.type === 'SET_ZONE') {
        return{...state,
            zone: action.payload,
            isGuest: true
        }
    } else if (action.type === 'NOT_GUEST') {
        return{...state,
            isGuest: false
        }
    } else if (action.type === 'UPDATE_GARDEN') {
        return{...state,
            new_garden: action.payload
        }
    } else if (action.type === 'UPDATE_TABLE') {
        return{...state,
            new_plant: action.payload
        } 
    } else {
        return state
    }
}


export default reducer