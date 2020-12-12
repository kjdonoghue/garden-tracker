import {connect} from 'react-redux'

function Logout(props) {

    const handleLogout = () => {
        localStorage.clear()
        props.isAuth()
        window.location.href = ('/')
    }

    return(
        <div>
            <b onClick={() => handleLogout()}>Logout</b>
       </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAuth: () => dispatch({type: 'ON_LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Logout)
