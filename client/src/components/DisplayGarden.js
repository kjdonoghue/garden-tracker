import GardenTable from './GardenTable'
import AddPlant from './AddPlant'
import ChooseGarden from './ChooseGarden'
import DisplayGardenName from './DisplayGardenName'
import AddGarden from './AddGarden'


function DisplayGarden(props) {


    return(
        <div>
            <DisplayGardenName />
            <ChooseGarden />
            <AddGarden />
            <AddPlant />
            <GardenTable />
            
        </div>
    )
}

export default DisplayGarden