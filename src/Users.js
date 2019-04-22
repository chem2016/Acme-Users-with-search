import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

import Pager from './Pager'

class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            count: 0,
        }
        this.load()
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.idx !== this.props.match.params.idx){
            this.load()
        }
    }

    load = () =>{
        console.log('this.props.match', this.props.match)
        axios.get(`https://acme-users-api.herokuapp.com/api/users/${this.props.match.params.idx || ''}`)
            .then(resp=>resp.data)
            .then(({users, count})=>this.setState({users, count}))
    }

    render(){
        const {users, count} =  this.state
        // const current = this.props.match.params.idx ? this.props.match.params.idx*1 : 0;
        // const pageCount = Math.floor(count/50);
        // const last = current === pageCount;
        // const first = current === 0;
        return(
            <div>
                {/* <div>
                You are viewing page { current + 1 } out of { pageCount + 1 }
                </div>
                <div className='btn-group'>
                    <Link className={`btn btn-primary${first ? ' disabled': ''}`} to='/Users'>First</Link>
                    <Link className={`btn btn-primary${first ? ' disabled': ''}`}  to={`/Users/${current - 1}`}>Prev</Link>
                    <Link className={`btn btn-primary`}  to={`/Users/${current}`}>{current}</Link>
                    <Link className={`btn btn-primary${last ? ' disabled': ''}`} to={`/Users/${current + 1 }`}>Next</Link>
                    <Link className={`btn btn-primary${last ? ' disabled': ''}`}  to={`/Users/${pageCount}`}>Last</Link>
                </div> */}
                {/* <Router>
                    <Route path='/Users' render={({match, count})=>(
                        <Pager 
                            match={match}
                            count={count}
                            />
                    )}/>
                </Router> */}
                <Pager match={this.props.match} count={count}/>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>First</th>
                        <th>Middle</th>
                        <th>Last</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map( user => (
                        <tr key={ user.id }>
                            <td>{ user.firstName }</td>
                            <td>{ user.middleName }</td>
                            <td>{ user.lastName }</td>
                            <td>{ user.email }</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users