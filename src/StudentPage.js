import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function StudentPage (props) {

  const student = props.students.find(item=>item.id===props.location.pathname.split('/')[2]*1);
  const campus = props.campuses.find(item=>item.id===Number(student && student.campusId));
  if(student){
  return (
    <div id='studentPage'>
    
        <div>
            <h2>{ student.firstName+' '+student.lastName }</h2>
            <img src={ student.imageUrl } />
            {campus?<h4>School: <Link to={`/campuses/${campus.id}`}>{ campus.name }</Link></h4>: 
            <h4>School: This student has been expelled!</h4>}
            <h4>GPA: { student.gpa }</h4>
            <h4>Email: { student.email }</h4>
        </div>
    </div>
  )
  } else {
    return(
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = (state)=>{
  if(!state.students){
    return {}
  }
  return {students : state.students, campuses: state.campuses};
}

export default connect(mapStateToProps, null)(StudentPage);

