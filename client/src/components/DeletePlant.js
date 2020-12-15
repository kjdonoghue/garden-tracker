import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import Message from './Message'
import './css/delete.css'

//for material ui
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function DeletePlant(props) {
  //for material ui
  const classes = useStyles();

    //set error message if user to choose a plant
    const[message, setMessage] = useState()

  const handleDelete = (id) => {

    axios.delete(`https://tranquil-taiga-06770.herokuapp.com/garden/delete-plant/${id}`)
      .then(response => {

        let success = response.data.success

        if (success) {
          props.onDeleted("update table")
        } else {
          setMessage("please select the item that you would like to delete")
        }
      })
  }



  return (
   
      <div className={classes.root}>
        
        <div className='delete'>
        <IconButton aria-label="delete" >
          <DeleteIcon onClick={() => handleDelete(props.id)} />
        </IconButton>
        </div>
        <Message message={message} />
      </div>

  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleted: (plant) => dispatch(actionCreators.onDeletePlant(plant))
  }
}


export default connect(null, mapDispatchToProps)(DeletePlant)