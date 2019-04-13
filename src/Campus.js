import React from 'react';
import {Link} from 'react-router-dom';

export default function Campus (props) {

  const campus = props.campus;

  return (
    <div id='campus'>
        <li className="list-group-item">
            <img src={ campus.imageUrl} />
            <h4>{ campus.name }</h4>
            <h4>{ campus.address }</h4>
            {/* <button onClick={()=>props.editUser(user.id, user)} className="btn btn-primary btn-sm">EDIT</button>  */}
            {/* <Link to='/users/edit/'>Edit</Link> */}
            {/* <UserForm user={user} /> */}
            {/* <button onClick={()=>props.deleteUser(user.id)} className="btn btn-danger btn-sm">DELETE</button> <br/> */}
        </li>
    </div>
  
  );
}
