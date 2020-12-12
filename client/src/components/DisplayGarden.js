import GardenTable from './GardenTable'
import ChooseGarden from './ChooseGarden'
import AddGarden from './AddGarden'
import {connect} from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'


function DisplayGarden(props) {

    useEffect(() => {
        fetchPrimaryGarden()
    }, [])

    const fetchPrimaryGarden = () => {
    // axios.get('http://localhost:8080/garden/fetch-primary')
    // .then(response => {
    //     console.log(response)
    //     // let name = response.data.primary.garden_name
    //     // let value = response.data.primary.garden_id

    //     // props.onSetGardenDefault({garden_name: name, garden_id: value})
    // })

    }

    return(
        <div>
            <ChooseGarden />
            <AddGarden />
            <GardenTable />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetGardenDefault: (garden) => dispatch({type: 'SET_GARDEN', payload: garden}),
    }
} 

export default connect(null, mapDispatchToProps)(DisplayGarden)