import GardenTable from './GardenTable'
import AddPlant from './AddPlant'
import ChooseGarden from './ChooseGarden'


function DisplayGarden(props) {


    return(
        <div>
            <ChooseGarden />
            <AddPlant />
            <GardenTable />
            
        </div>
    )
}

export default DisplayGarden