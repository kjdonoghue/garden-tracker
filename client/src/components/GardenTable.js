import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import history from '.././utils/history'
import DeleteGarden from './DeleteGarden';
import SetPrimaryGarden from './SetPrimaryGarden';
import DeletePlant from './DeletePlant';
import GardenTableMobile from './GardenTableMobile';
import './css/garden.css'


function GardenTable(props) {

    //sets plants for use in rows
    const [plants, setPlants] = useState([])
    const [selectedPlant, setSelectedPlant] = useState()

    //sets columns
    const column = [
        { field: 'id', hide: true },
        { field: 'plant_name', headerName: 'Vegetable' },
        { field: 'quantity', headerName: 'Quantity' },
        { field: 'type', headerName: 'Started As' },
        { field: 'sow_date', headerName: 'Sow Date', description: 'The date you planted your seeds' },
        { field: 'planting_date', headerName: 'Planting Date', description: 'The date you planted the plant in the garden' },
        { field: 'first_harvest', headerName: 'First Harvest', description: 'The date of the first harvest' },
        { field: 'last_harvest', headerName: 'Last Harvest', description: 'The date of the last harvest' },
        { field: 'company', headerName: 'Company' },
        { field: 'notes', headerName: 'Notes' }]


    useEffect(() => {
        //gets plants in primary garden (in global state) updated when choose garden componet updates primary garden in redux
        fetchGarden(props.displayGarden)
    }, [props.displayGarden, props.updateOnDelete])


    //gets plants by garden id 
    const fetchGarden = (id) => {
        axios.get(`http://localhost:8080/garden/${id}`)
            .then(response => {
                setPlants(response.data)
            })
    }

    return (
        <div>
            <div className="desktopGardenContainer">
                <h2>{props.displayGardenName}</h2>
                {props.displayGarden ? <div>
                    <DeleteGarden id={props.displayGarden} />
                    <SetPrimaryGarden id={props.displayGarden} name={props.displayGardenName} />
                    <NavLink to={`/detail/${selectedPlant}`}><button>Edit</button></NavLink>
                    <b><NavLink to="/add-plant"><button>Add Plant</button></NavLink></b>
                    <DeletePlant id={selectedPlant} /> 
                </div> : null}
               
              
                <div style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        columns={column}
                        rows={plants}
                        checkboxSelection
                        onSelectionChange={(newSelection) => {
                            setSelectedPlant(newSelection.rowIds[0])
                        }}
                    />
                    </div>
            </div>
            <div className='mobileGardenContainer'>
                <GardenTableMobile plants={plants} />
            </div>

        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        // this is the garden id:
        displayGarden: state.gardenReducer.primary_garden,

        //this is the garden name:
        displayGardenName: state.gardenReducer.primary_garden_name,

        //this update the table when a plant is deleted
        updateOnDelete: state.gardenReducer.table_update
    }
}



export default connect(mapStateToProps)(GardenTable)