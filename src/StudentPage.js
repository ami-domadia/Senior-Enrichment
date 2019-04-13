import React from 'react';
import {Link} from 'react-router-dom';

export default function StudentPage (props) {

  const students = props.students;
  const campuses = props.campuses;
  console.log(students);
  const student = students.filter(item=>item.id===Number(props.id))[0];

  console.log(props.id);
  let campus = campuses.filter(item=>item.id===Number(student.campusId))[0];
  console.log('StudentPage:', student);
  if(!campus){
      campus = {name: 'This student has been expelled!'}
  }

  return (
    <div id='studentPage'>
            <h2>{ student.firstName+' '+student.lastName }</h2>
            <img src={ student.imageUrl } />
            <h4>School: <Link to={`/campuses/${campus.id}`}>{ campus.name }</Link> </h4>
            <h4>GPA: { student.gpa }</h4>
            <h4>Email: { student.email }</h4>


            {/* <button onClick={()=>props.editUser(user.id, user)} className="btn btn-primary btn-sm">EDIT</button>  */}
            {/* <Link to='/users/edit/'>Edit</Link> */}
            {/* <UserForm user={user} /> */}
            <button onClick={()=> 'what'} className="btn btn-danger btn-sm">DELETE</button> <br/>
    </div>
  
  );
}
