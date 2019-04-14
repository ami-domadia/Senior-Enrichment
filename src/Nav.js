import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({location}) => {
    const pathname = location.pathname
    return (
        // <ul className='nav nav-tabs'>
            <ul className="topnav">

            <li key='Home' className={`nav-link ${pathname==='/'? 'active':''}`}>
                <Link to='/'>Home</Link>
            </li>            
            <li key='students'> 
                <Link to='/students' className={`nav-link ${pathname==='/students'? 'active':''}`}>Students</Link>
            </li>
            <li key='campuses'> 
                <Link to='/campuses' className={`nav-link ${pathname==='/campuses'? 'active':''}`}>Campuses</Link>
            </li>
            {/* <li key='create'> 
                <Link to='/campuses/create' className={`nav-link ${pathname==='/campuses/create'? 'active':''}`}>New Campus</Link>
            </li> */}
            {/* <li key='topRanked'> 
                <Link to='/users/topRanked' className={`nav-link ${pathname==='/users/topRanked'? 'active':''}`}>TopRanked {toplist.map(user=>user.name)}</Link>
            </li> */}
            </ul>
    )
}

Nav.proptypes = {
    location: PropTypes.object,
}

export default Nav