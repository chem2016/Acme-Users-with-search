import React, {Component} from 'react';
import axios from 'axios';

import Pager from './Pager';

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            count: 0,
            name: this.props.match.params.searchTerm || ''
        }
    }

    componentDidMount(){
        this.load()
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.searchTerm !== this.props.match.params.searchTerm || prevProps.match.params.idx !== this.props.match.params.idx){
            this.load()
        }
    }

    load = () => {
        console.log('calling this.load')
        axios.get(`https://acme-users-api.herokuapp.com/api/users/search/${this.props.match.params.searchTerm}/${this.props.match.params.idx || ''}`)
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
        if(name){
            this.props.history.push(`/users/search/${name}`)
        }else{
            this.props.history.push(`/users`)
        }
        
    }

    toMatch = (originalStr, matchStr) => {
        const re = new RegExp(matchStr,"gi");
        const found = originalStr.match(re);
        const unmatchArr = originalStr.split(matchStr);
        let newArr = [];
        for(let i=0; i<unmatchArr.length; i++){
            if(i !== unmatchArr.length - 1){
              newArr.push(unmatchArr[i])
              newArr.push(found[i])
            }else{
                newArr.push(unmatchArr[i])
            }
          }
        console.log(newArr)
        return newArr
    }

    render(){
        const {users, count, name} =  this.state
        const {onSave, onChange, navigate} = this
        const color = 'gold'; 
        return (<div>
            <Pager match={this.props.match} count={count} searchTerm={this.props.match.params.searchTerm}/>
            <form onSubmit={onSave}>
                    <input className='form-control' placeholder='Search Results' name='name' value={name} onChange={onChange}/>
                    <button className='btn btn-primary' type='submit' onClick={()=>navigate(name)}>{ 'Go' }</button>   
                    <button className='btn btn-primary' type='submit' onClick={()=>navigate()}>{ 'Clear' }</button>
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
                    users.map( user => {
                        
                        return (<tr key={ user.id }>
                            <td>{ 
                                this.toMatch(user.firstName , name).map((substr,idx)=>{
                                    if(substr.toLowerCase() === name.toLowerCase()){
                                        return (<span style={{ color }} key={idx}>{substr}</span>)
                                    }else{
                                        return substr
                                    }
                                })
                                }</td>
                            <td>{ 
                                this.toMatch(user.middleName , name).map((substr,idx)=>{
                                    if(substr.toLowerCase() === name.toLowerCase()){
                                        return (<span style={{ color }} key={idx}>{substr}</span>)
                                    }else{
                                        return substr
                                    }
                                })
                                }</td>
                            <td>{ 
                                this.toMatch(user.lastName , name).map((substr,idx)=>{
                                    if(substr.toLowerCase() === name.toLowerCase()){
                                        return (<span style={{ color }} key={idx}>{substr}</span>)
                                    }else{
                                        return substr
                                    }
                                })
                                }</td>
                            <td>{this.toMatch(user.email, name).map((substr,idx)=>{
                                if(substr.toLowerCase() === name.toLowerCase()){
                                    return (<span style={{ color }} key={idx}>{substr}</span>)
                                }else{
                                    return substr
                                }
                            })}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>)
    }

}

export default Search