
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import {connect} from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

//for material ui
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function DeleteGarden(props) {
    //for material ui
    const classes = useStyles();

    const handleDelete = (id) => {
        axios.delete(`https://tranquil-taiga-06770.herokuapp.com/garden/delete-garden/${id}`)
        .then(response => {

            let success = response.data.success
    
            if (success) {
                props.updateGardenLists(id)                
            } else {
              console.log("did not update")
            }
        })
    }

    return(
        <div>
            <div className={classes.root}>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={() => handleDelete(props.id)}/>
            </IconButton>
    </div>
        </div>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGardenLists: (garden) => dispatch(actionCreators.onDeleteGarden(garden))
    }
}


export default connect(null, mapDispatchToProps)(DeleteGarden)