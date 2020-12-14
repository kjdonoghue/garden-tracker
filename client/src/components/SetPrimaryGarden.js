import React, {useState} from 'react'
import axios from "axios";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


function SetPrimaryGarden(props) {

    //to change folor of favorite icon when set to favorite
    const [primaryColor, setPrimaryColor] = useState('')

    const updatePrimaryGarden = (id, name) => {

        axios.post('http://localhost:8080/garden/set-primary', {
            data: {
                garden_id: id,
                garden_name: name
            }
        }).then(response => {
            if (response.data.success) {
                setPrimaryColor('secondary')    
            } else {
                alert("Your primary garden did not save")
            }
        })

    }

    return (
            <IconButton onClick={() => updatePrimaryGarden(props.id, props.name)} aria-label="favorite"> <FavoriteIcon color={primaryColor}/> </IconButton>
    )

}



export default SetPrimaryGarden