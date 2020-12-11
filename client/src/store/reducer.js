const initialState = {
    zone: '',
    garden_list: [],
    primary_garden: '',
    primary_garden_name: '',
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
            primary_garden: action.payload.garden_id,
            primary_garden_name: action.payload.garden_name
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
    } else if (action.type === 'SET_GARDEN_LIST') {
        return{...state, 
            garden_list: action.payload
        }
    } else if (action.type === 'DELETE_GARDEN') {
        return{...state,
            primary_garden: '',
            primary_garden_name: '',
            //new garden is just to trigger update for choose garden component
            new_garden: ''
        }
    } else {
        return state
    }
}


export default reducer