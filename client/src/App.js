
import './App.css';
import Button from '@material-ui/core/Button';
import greenhouse from './components/images/greenhouse.png'
import {NavLink} from 'react-router-dom'


function App() {

  return (
    <div className="App">
      <div className="appContainer">
        <div className="imageContainer">
          <img src={greenhouse} alt="greenhouse" className="image" />
        </div>
        <div className="textContainer">
        <div className='appHeader'><h1>ORGANIZE AND TRACK YOUR PLANTS FOR GARDENING SUCCESS!</h1></div>   
        <div className='appCopy'>
              
            <p>Whether you’re an experienced green thumb or a gardening newbie, Garden Tracker will help you organize and track your seed starting dates and gardening success.</p>
            <p> Our grid style layout makes it easy see all your plant information at once, and sort by name, planting and harvesting dates, and where you purchased your plants or seeds making planning for next a breeze. </p>
              <p>Plus our gardening guide provide detailed information on the needs of each variety of vegetable to ensure a productive season.</p>
            </div>
          <div className='buttonContainer'>
            <div className="buttonItem">
              <NavLink to='/register'><Button className="button" variant="contained" color="primary"> Sign Up </Button></NavLink>
            </div>
            <div className="buttonItem">
            <NavLink to='/login'><Button className="button" variant="contained" color="primary"> LogIn </Button></NavLink>
            </div>
            <div className="buttonItem">
            <NavLink to='/guides'><Button className="button" variant="contained" color="primary"> Go to the Guides </Button></NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
