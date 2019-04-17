import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Student from './Student';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {getStudentThunk, getCampusThunk} from './store';

class StudentList extends Component{
    constructor(props){
        super(props);
    }

    async componentDidMount () {
        await this.props.getStudents();
        await this.props.getCampuses();  
    }

    render(){
        const students = this.props.studentsOfThisSchool? this.props.studentsOfThisSchool: this.props.students;
        console.log('students in student list', students);
        if(students && students.length>0){
        return (
            <div>
                <div align="left">
                    <Link to='/students/save'>Add New Student</Link>
                </div>
                <ul className="list-group" >
                { students!==[] && students !==  undefined? students.map(student => <Student student={student} key={student.id}/>): ''}
                </ul>
            </div>
        )
        } else {
            return(
              <div>Loading..</div>
            )
          }
        }
}

StudentList.proptypes = {
    students: PropTypes.Array,
}

const mapStateToProps = (state) => {
    return {
      campuses: state!=={} && state.campuses !== undefined? state.campuses: false,
      students: state!=={} && state.students !== undefined? state.students: false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: ()=>dispatch(getStudentThunk()),
        getCampuses: ()=>dispatch(getCampusThunk())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);




