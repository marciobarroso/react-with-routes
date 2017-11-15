import React, {Component} from 'react'
import axios from 'axios'
import Message from '../Message'

export default class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: 'not-authenticated',
            token: this.props.match.params.token,
            redirect: this.props.match.params.redirect
        }
    }

    componentDidMount() {
        axios.interceptors.request.use(function (config) {
            if(config != null && localStorage.token != null){
                config.headers = {
                    Authorization: localStorage.token
                }
            }
            return config;
        });

        axios.get('http://localhost:8080/api/parisnovios/v1/authentication/' + this.state.token)
            .then(result => {
                this.setState({
                    ...this.state, status: 'authenticated'
                })
            }).catch(error => {
                this.setState({
                    ...this.state, status: 'error', message: error.message
                })
            })
    }

    render() {
        if( this.state.status === 'not-authenticated' ) {
            return <Message>Not Authorizated</Message>
        } else if( this.state.status === 'error' ) {
            return <Message>{this.state.message}</Message>
        } else if( this.state.status === 'authenticated' ){
            if( this.state.redirect ) {
                window.location = '/' + this.state.redirect
            } else {
                return <Message>User Successful Authenticated</Message>
            }
        } else {
            return <Message>Unknow Error</Message>
        }
    }
}
