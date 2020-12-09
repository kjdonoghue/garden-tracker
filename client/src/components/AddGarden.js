import AddPlant from './AddPlant'
import GardenTable from './GardenTable'

function AddGarden(props) {


    return(
        <div>
            <p>create a new garden</p>
            <input type="text" planceholder="garden name"/>
            <AddPlant />
            <GardenTable />
            
        </div>
    )
}

export default AddGarden