import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function Campus (props) {

  const campus = props.campus;

  return (
    <div id='campus'>
        <li className="list-group-item">
            <img src={ campus.imageUrl} /><br/>
            <Link to={`/campuses/${campus.id}`}>{ campus.name }</Link>
            <h4>{ campus.address }</h4>
            <button onClick={()=> props.deleteCampus(campus.id)} className="btn btn-danger">SHUTDOWN CAMPUS</button> <br/><br/>
        </li>
    </div>
  
  );
}
