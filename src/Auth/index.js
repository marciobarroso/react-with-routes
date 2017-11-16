import React, {Component} from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import Message from '../Message'

export default class Auth extends Component {

    constructor(props) {
        super(props)
        let params = this.queryStringParse(this.props.location)
        this.state = {
            status: 'not-authenticated',
            token: this.props.match.params.token,
            redirect: params.redirect
        }
    }

    queryStringParse(location) {
        let params = []

        if( location.search ) {
            let querys = location.search.substring(1).split('&')
            querys.forEach(query => {
                let param = query.split('=')
                params[param[0]] = param[1]
            })
        }

        return params
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
                return <Redirect to={'/' + this.state.redirect} />
            } else {
                return <Message>User Successful Authenticated</Message>
            }
        } else {
            return <Message>Unknow Error</Message>
        }
    }
}
