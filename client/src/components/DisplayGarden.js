import GardenTable from './GardenTable'
import ChooseGarden from './ChooseGarden'
import AddGarden from './AddGarden'


function DisplayGarden(props) {

    return(
        <div>
            <ChooseGarden />
            <AddGarden />
            <GardenTable />
        </div>
    )
}

export default DisplayGarden