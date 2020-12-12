const initialState = {
    zone: '',
    isGuest: false,
}

const reducer = (state= initialState, action) => {

    if (action.type === 'SET_ZONE') {
        return{...state,
            zone: action.payload,
            isGuest: true
        }
    } else if (action.type === 'NOT_GUEST') {
        return{...state,
            isGuest: false
        }
    } else {
        return state
    }
}


export default reducer