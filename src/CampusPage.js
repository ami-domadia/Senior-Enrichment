import React from 'react';
import {Link} from 'react-router-dom';
import StudentList from './StudentList';

export default function CampusPage (props) {

  const students = props.students;
  const campuses = props.campuses;
  console.log(campuses);
  const campus = campuses.filter(item=>item.id===Number(props.id))[0];

  console.log(campus);
  let studentsOfThisSchool = students.filter(item=>item.campusId===campus.id);
  console.log('CampusPage:', campus);

  return (
    <div id='campusPage'>
            <h2>{ campus.name}</h2>
            <img src={ campus.imageUrl } />
            <h4>In the Country of {campus.address} </h4>
            {campus.description? <h4>Info: { campus.description }</h4>: <br/> }
            {studentsOfThisSchool.length===0?
            <h4>No students admitted!</h4>:
            <StudentList students={studentsOfThisSchool}/>}


            {/* <button onClick={()=>props.editUser(user.id, user)} className="btn btn-primary btn-sm">EDIT</button>  */}
            {/* <Link to='/users/edit/'>Edit</Link> */}
            {/* <UserForm user={user} /> */}
            <button onClick={()=> 'what'} className="btn btn-danger btn-sm">DELETE</button> <br/>
    </div>
  
  );
}
