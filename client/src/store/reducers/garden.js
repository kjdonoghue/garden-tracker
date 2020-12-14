const initialState = {
    garden_list: [],
    primary_garden: '',
    primary_garden_name: '',
    new_garden: '',
    table_update: '',
}

const reducer = (state= initialState, action) => {
    
    if (action.type === 'SET_GARDEN') {
        return{...state,
            primary_garden: action.payload.garden_id,
            primary_garden_name: action.payload.garden_name
        }
   
    } else if (action.type === 'UPDATE_GARDEN') {
        return{...state,
            new_garden: action.payload
        }
    } else if (action.type === 'UPDATE_TABLE') {
        return{...state,
            //triggers garden table to upload
            table_update: action.payload
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
            new_garden: action.payload.garden
        }
    } else {
        return state
    }
}


export default reducer