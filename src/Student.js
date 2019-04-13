import React from 'react';
import {Link} from 'react-router-dom';

export default function Student (props) {

  const student = props.student;

  return (
    <div id='student'>
        <li className="list-group-item">
            <img src={ student.imageUrl} />
            <h4>{ student.firstName+' '+student.lastName }</h4>
            <h4>GPA: {student.gpa}</h4>
            {/* <button onClick={()=>props.editUser(user.id, user)} className="btn btn-primary btn-sm">EDIT</button>  */}
            {/* <Link to='/users/edit/'>Edit</Link> */}
            {/* <UserForm user={user} /> */}
            {/* <button onClick={()=>props.deleteUser(user.id)} className="btn btn-danger btn-sm">DELETE</button> <br/> */}
        </li>
    </div>
  
  );
}
