import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteStudentThunk} from './store';
import PropTypes from 'prop-types';

class Student extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const student = this.props.student;
    if(student){
      return (
        <div id='student'>
          <div>
            <li className="list-group-item">
                <img src={ student.imageUrl} />
                <Link to={`/students/${student.id}`}>{ student.firstName+' '+student.lastName }</Link><br/>
                <button onClick={()=>this.props.deleteStudent(student.id)} className="btn btn-danger btn-sm">EXPEL</button>
                <Link to={`/students/save/${student.id}`}>EDIT</Link>
                <br/>
            </li>
            </div>
        </div>
      )
  } else {
    return(
      <div>Loading...</div>
    )
  }
}
}




Student.propTypes = {
  deleteStudent: PropTypes.func,
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    deleteStudent: (id) => {
      // history.push('/students');
      return dispatch(deleteStudentThunk(id));
    }
  }

}

export default connect(null, mapDispatchToProps)(Student);
