import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SpaIcon from '@material-ui/icons/Spa';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './css/garden.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function GardenTableMobile(props) {
  const classes = useStyles();

  let plantList = props.plants.map(plant => {
    return <div key={plant.id}> <NavLink to={`/detail/${plant.id}`}>
      <ListItemLink>
        <ListItemIcon>
          <SpaIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary={plant.plant_name} className='mobileLinkItem' />
      </ListItemLink>
    </NavLink>
      <Divider />
    </div>
  })

  return (
    <div className='listContainer'>
      {props.displayGarden ? <div className='mobileAdd'>
        <span><NavLink to="/add-plant"><IconButton aria-label="add"> <AddCircleIcon /> </IconButton></NavLink></span>

      </div> : null}
      <div className={classes.root}>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          {plantList}
        </List>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
      // this is the garden id:
      displayGarden: state.gardenReducer.primary_garden,

      // //this is the garden name:
      // displayGardenName: state.gardenReducer.primary_garden_name,

      // //this update the table when a plant is deleted
      // updateOnDelete: state.gardenReducer.table_update
  }
}

export default connect(mapStateToProps)(GardenTableMobile)