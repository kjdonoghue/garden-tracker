import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';


function GardenTable(props) {
    
    //sets plants for use in rows
    const [plants, setPlants] = useState([])

    //sets columns
    const column = [
        { field: 'id', hide: true  }, 
        { field: 'plant_name', headerName: 'Vegetable' }, 
        { field: 'sow_date', headerName: 'Sow Date', description: 'The date you planted your seeds' },  
        { field: 'planting_date', headerName: 'Planting Date', description: 'The date you planted the plant in the garden' },  
        { field: 'first_harvest', headerName: 'First Harvest', description: 'The date of the first harvest'}, 
        { field: 'last_harvest', headerName: 'Last Harvest', description: 'The date of the last harvest' }, 
        { field: 'notes', headerName: 'Notes'}]

    //sets table selection
    // const [selection, setSelection] = useState({})

    useEffect(() => {      
        //gets plants in primary garden (in global state) when updated
        fetchGarden(props.displayGarden)
    }, [props.displayGarden])
    
    //gets plants by garden id 
    const fetchGarden = (id) => {
        axios.get(`http://localhost:8080/garden/${id}`)
        .then(response => {
            setPlants(response.data)
        })

    }

    return (

        <div>                
        <div style={{ height: 250, width: '100%' }}>
        <DataGrid
            columns={column}
            rows={plants} 
            onSelectionChange={(newSelection) => {     
                window.location.href = (`/plant/${newSelection.rowIds[0]}`)
                // window.location.href = (`/plant/${id}/${newSelection.rowIds[0]}`)
                //garden id / plant id
                }}                 
        />

      </div>
      
      </div>
     
    );
} 

const mapStateToProps = (state) => {
    return{
        displayGarden: state.primary_garden
    }
}

export default connect(mapStateToProps)(GardenTable)