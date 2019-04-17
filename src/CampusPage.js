import React from 'react';
import StudentList from './StudentList';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function CampusPage (props) {

  const students = props.students;
  const campus = props.campuses.find(item=>item.id===Number(props.location.pathname.split('/')[2]));
  console.log('in campuspage', campus);
  let studentsOfThisSchool = students && campus && students.length>0? students.filter(item=>item.campusId===campus.id): [];
  console.log('CampusPage:', students.filter(item=>item.campusId===campus.id));
  console.log('studentsOfThisSchool', studentsOfThisSchool);
  if(campus){
  return ( 
    <div>{campus && 
            (<div>
              <h2>{ campus.name}</h2>
              <img src={ campus.imageUrl } />
              <h4>In the Country of {campus.address} </h4>
              {campus.description? <h4>Info: { campus.description }</h4>: <br/> }
              <h4>Student List:</h4>
              {studentsOfThisSchool.length===0?
              <h3>No students admitted!</h3>:
              <StudentList studentsOfThisSchool={studentsOfThisSchool}></StudentList>}
              </div>)}
    </div>
  
  )} else {
    return (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = (state)=>{
  if(!state.campuses){
    return {}
  }
  return {students : state.students, campuses: state.campuses};
}


export default connect(mapStateToProps, null)(CampusPage);
