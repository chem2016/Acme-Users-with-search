import React from 'react'
import {Link} from 'react-router-dom'

const Pager = (props) =>{
    const match = props.match
    const count = props.count
    const searchTerm = props.searchTerm
    // console.log('searchTerm in pager: ', searchTerm)
    
    const current = match.params.idx ? match.params.idx*1 : 0;
    const pageCount = Math.floor(count/50);
    const last = current === pageCount;
    const first = current === 0;
    return (
        <div>
            <div>
                You are viewing page { current + 1 } out of { pageCount + 1 }
            </div>
            <div className='btn-group'>
                <Link className={`btn btn-primary${first ? ' disabled': ''}`} to= {searchTerm ? `/users/search/${searchTerm}` : '/users'}>First</Link>
                <Link className={`btn btn-primary${first ? ' disabled': ''}`}  to={ searchTerm ? `/users/search/${searchTerm}/${current - 1}`: `/users/${current - 1}`}>Prev</Link>
                <Link className={`btn btn-primary`}  to={ searchTerm ? `/users/search/${searchTerm}/${current}` : `/users/${current}`}>{current}</Link>
                <Link className={`btn btn-primary${last ? ' disabled': ''}`} to={ searchTerm ? `/users/search/${searchTerm}/${current + 1 }` : `/users/${current + 1 }`}>Next</Link>
                <Link className={`btn btn-primary${last ? ' disabled': ''}`}  to={searchTerm ? `/users/search/${searchTerm}/${pageCount}` : `/users/${pageCount}`}>Last</Link>
            </div> 
        </div>
    )
}

export default Pager