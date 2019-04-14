import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Student from './Student';

const StudentList = (props) => {

        const students = props.students;
        console.log(students);
        return (
            <div>
                <ul className="list-group" >
                { students!=={} && students !==  undefined? students.map(student => <Student student={student} key={student.id} deleteStudent={props.deleteStudent} />): ''}
                </ul>
            </div>
        )
}

StudentList.proptypes = {
    students: PropTypes.Array,
    deleteStudent: PropTypes.function,
}

export default StudentList;

