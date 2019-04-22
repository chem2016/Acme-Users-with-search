import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

const Pager = (props) =>{
    console.log(props)
    const match = props.match
    const count = props.count

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
                <Link className={`btn btn-primary${first ? ' disabled': ''}`} to='/Users'>First</Link>
                <Link className={`btn btn-primary${first ? ' disabled': ''}`}  to={`/Users/${current - 1}`}>Prev</Link>
                <Link className={`btn btn-primary`}  to={`/Users/${current}`}>{current}</Link>
                <Link className={`btn btn-primary${last ? ' disabled': ''}`} to={`/Users/${current + 1 }`}>Next</Link>
                <Link className={`btn btn-primary${last ? ' disabled': ''}`}  to={`/Users/${pageCount}`}>Last</Link>
            </div> 
        </div>
    )
}

export default Pager