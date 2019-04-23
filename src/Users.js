import React, {Component} from 'react'
import axios from 'axios'

import Pager from './Pager'

class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            count: 0,
            name: ''
        }
        this.load()
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.idx !== this.props.match.params.idx){
            this.load()
        }
    }

    load = () =>{
        // console.log('this.props.match in Users', this.props.match)
        axios.get(`https://acme-users-api.herokuapp.com/api/users/${this.props.match.params.idx || ''}`)
            .then(resp=>resp.data)
            .then(({users, count})=>this.setState({users, count}))
    }

    onSave = (ev) =>{
        ev.preventDefault();
    }

    onChange = (ev) =>{
        this.setState({[ev.target.name]: ev.target.value})
    }

    navigate = (name) =>{
        this.props.history.push(`/users/search/${name}`)
    }

    render(){
        const {users, count, name} =  this.state
        const {onSave, onChange, navigate} = this
        return(
            <div>
                <Pager match={this.props.match} count={count}/>
                <form onSubmit={onSave}>
                    <input className='form-control' placeholder='Search Results' name='name' value={name} onChange={onChange}/>
                    <button className='btn btn-primary' type='submit' onClick={()=>navigate(name)}>{ 'Go' }</button>   
                    <button className='btn btn-primary' type='submit'>{ 'Clear' }</button>
                </form>
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