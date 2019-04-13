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
            <h4>Student List:</h4>
            {campus.description? <h4>Info: { campus.description }</h4>: <br/> }
            {studentsOfThisSchool.length===0?
            <h3>No students admitted!</h3>:
            <StudentList students={studentsOfThisSchool} deleteStudent={props.deleteStudent}/>}
    </div>
  
  );
}
