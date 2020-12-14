import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { NavLink } from "react-router-dom";
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
        { field: 'plant_family', headerName: 'Family' },
        { field: 'quantity', headerName: 'Quantity'},
        { field: 'type', headerName: 'Started As' },
        { field: 'sow_date', headerName: 'Sow Date', description: 'The date you planted your seeds',  width: 125 },
        { field: 'planting_date', headerName: 'Planting Date', description: 'The date you planted the plant in the garden',  width: 125},
        { field: 'first_harvest', headerName: 'First Harvest', description: 'The date of the first harvest',  width: 125 },
        { field: 'last_harvest', headerName: 'Last Harvest', description: 'The date of the last harvest',  width: 125 },
        { field: 'company', headerName: 'Company', width: 100},
        { field: 'notes', headerName: 'Notes', width: 200}]


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
             {props.displayGarden ? <div className='nameContainer'>
                 <h2>{props.displayGardenName}</h2> 
                 <SetPrimaryGarden id={props.displayGarden} name={props.displayGardenName} />
             </div> : null}

            <div className="desktopGardenContainer">
                    {props.displayGarden ? <div className="plantButtons"> 
                    <div className='addEdit'> 
                    <span><NavLink to="/add-plant"><IconButton aria-label="add"> <AddCircleIcon /> </IconButton></NavLink></span>               
                    <span><NavLink to={`/detail/${selectedPlant}`}><IconButton aria-label="edit"> <EditIcon /> </IconButton></NavLink></span>
                    </div>
                    <div className='deletePlant'>
                    <span><DeletePlant id={selectedPlant} /></span>
                    </div>
                </div> : null}               
              
                <div style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        columns={column}
                        rows={plants}
                        checkboxSelection
                        onSelectionChange={(newSelection) => {
                            setSelectedPlant(newSelection.rowIds[0])
                        }}
                        hideFooter
                    />
                    </div>
            </div>
            <div className='mobileGardenContainer'>
                <GardenTableMobile plants={plants} />
            </div>
            {props.displayGarden ? <div className='deleteContainer'>
                 <DeleteGarden id={props.displayGarden} />
                 </div> : null}

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