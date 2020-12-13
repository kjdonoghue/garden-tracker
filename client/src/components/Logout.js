import {connect} from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

function Logout(props) {

    const handleLogout = () => {
        localStorage.clear()
        props.isAuth()
        window.location.href = ('/')
    }

    return(
        <div>
            <label onClick={() => handleLogout()}>LOGOUT</label>
       </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAuth: () => dispatch(actionCreators.loggedOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
