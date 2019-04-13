import React from 'react';
import {Link} from 'react-router-dom';

export default function Student (props) {

  const student = props.student;

  return (
    <div id='student'>
        <li className="list-group-item">
            <img src={ student.imageUrl} />
            <Link to={`/students/${student.id}`}>{ student.firstName+' '+student.lastName }</Link><br/>
            {/* <button onClick={()=>props.editUser(user.id, user)} className="btn btn-primary btn-sm">EDIT</button>  */}
            {/* <Link to='/users/edit/'>Edit</Link> */}
            {/* <UserForm user={user} /> */}
            <button onClick={()=> props.deleteStudent(student.id)} className="btn btn-danger btn-sm">EXPEL</button> <br/>
        </li>
    </div>
  );
}
