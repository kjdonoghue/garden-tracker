import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpaIcon from '@material-ui/icons/Spa';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import './css/garden.css'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function GardenTableMobile(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  let plantList = props.plants.map(plant => {
    return <div key={plant.id}> <NavLink to={`/detail/${plant.id}`}>
      <ListItem>
        <ListItemIcon>
          <SpaIcon />
        </ListItemIcon>
        <ListItemText
          primary={plant.plant_name}
          secondary={plant.plant_family}
        />
      </ListItem>,
                </NavLink>
    </div>
  })

  return (

    <Grid item xs={12} md={6}>
      <div className='listContainer'>
        {props.displayGarden ? <div className='mobileAdd'>
          <span><NavLink to="/add-plant"><IconButton aria-label="add"> <AddCircleIcon /> </IconButton></NavLink></span>
        </div> : null}
      </div>
      <div className={classes.demo}>
        <List dense={dense}>
          {plantList}
        </List>
      </div>
    </Grid>
  );
}


const mapStateToProps = (state) => {
  return {
    // this is the garden id:
    displayGarden: state.gardenReducer.primary_garden,

  }
}

export default connect(mapStateToProps)(GardenTableMobile)