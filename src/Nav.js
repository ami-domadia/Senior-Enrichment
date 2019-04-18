import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({location}) => {
    const pathname = location.pathname
    return (
            <ul className="topnav">
                <li key='Home' >
                    <Link to='/' className={`nav-link ${pathname==='/'? 'active':''}`}>Home</Link>
                </li>            
                <li key='campuses'> 
                    <Link to='/campuses' className={`nav-link ${pathname==='/campuses'? 'active':''}`}>Campuses</Link>
                </li>
                <li key='students'> 
                    <Link to='/students' className={`nav-link ${pathname==='/students'? 'active':''}`}>Students</Link>
                </li>
            </ul>
    )
}

Nav.proptypes = {
    location: PropTypes.object,
}

export default Nav