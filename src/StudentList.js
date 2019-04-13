import React, { Component } from 'react';
import Student from './Student';

const StudentList = (props) => {

        const students = props.students;
        console.log(students);
        return (
            <div>
                <ul className="list-group" >
                { students.map(student => <Student student={student} key={student.id} />) }
                </ul>
            </div>
        );
}

export default StudentList;

