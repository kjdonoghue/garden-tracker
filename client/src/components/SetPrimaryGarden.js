import axios from "axios";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

//for material ui
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  

function setPrimaryGarden(props) {

    // //for material ui
    // const classes = useStyles();

    const updatePrimaryGarden = (id, name) => {

        console.log(id)
        axios.post('http://localhost:8080/garden/set-primary', {
            data: {
                garden_id: id,
                garden_name: name
            }
        }).then(response => {
            if (response.data.success) {
                alert("Your primary garden has been set")
            } else {
                alert("Your primary garden did not save")
            }
        })

    }

    return (
        <div>
        {/* <IconButton onClick={() => updatePrimaryGarden(props.id, props.name)} aria-label="delete" disabled color="primary">
            <FavoriteIcon />
        </IconButton> */}
        <button onClick={() => updatePrimaryGarden(props.id, props.name)}>Set Primary Garden</button>
        </div>
    )

}



export default setPrimaryGarden