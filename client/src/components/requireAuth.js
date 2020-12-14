import React, {Component} from 'react'
import {connect} from 'react-redux'

export default function(ComposedComponent) {

    class Authenticate extends Component {
        constructor(props) {
            super(props)

            if (!this.props.isAuth) {
                this.props.history.push('/login')
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }   

    const mapStateToProps = (state) => {
        return {
            isAuth: state.authenticatedReducer.isAuth
        }
    }

    return connect(mapStateToProps)(Authenticate)
}