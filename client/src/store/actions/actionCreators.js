import * as actionTypes from './actionTypes'

//on Login Component
export const loggedIn = () => {
    return {
        type: actionTypes.LOGGED_IN
    }
}

//on Login Component & Zone Component
export const setZone = (zone) => {
    return {
        type: actionTypes.SET_ZONE,
        payload: zone 
    }
}

//on Zone Component - - change zones button -notGuest will prompt the zone text box to show for input
export const notGuest = () => {
    return {
        type: actionTypes.NOT_GUEST
    }
}

//on logout component
export const loggedOut = () => {
    return {
        type: 'ON_LOGOUT'
    }
}

//on AddGarden Component
export const updateDisplay = (name) => {
    return {
        type: actionTypes.UPDATE_GARDEN, 
        payload: name   
    }
}

//on ChooseGarden Component - updating the selected garden
export const setSelectedGarden = (garden) => {
    return {
        type: actionTypes.SET_GARDEN, 
        payload: garden
    }
}

//on DeleteGarden Component
export const onDeleteGarden = (garden) => {
    return {
        type: actionTypes.DELETE_GARDEN,
        payload: garden
    }
}

//on DeletePlant Component
export const onDeletePlant = (plant) => {
    return {
        type: actionTypes.UPDATE_TABLE,
        payload: plant
    }
}