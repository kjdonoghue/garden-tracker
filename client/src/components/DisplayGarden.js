import GardenTable from './GardenTable'
import ChooseGarden from './ChooseGarden'
import AddGarden from './AddGarden'




function DisplayGarden(props) {

    return(
        <div>
            <h1>MY GARDENS</h1>
            <div className='selectNewGarden'>
                <ChooseGarden />
                <h4> or </h4>
                <AddGarden />
            </div>
            <GardenTable />
        
        </div>
    )
}


export default DisplayGarden