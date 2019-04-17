import React, {Component} from 'react';
import {connect} from 'react-redux';
import { saveStudentThunk, editStudentThunk } from './store';
import PropTypes from 'prop-types';

class StudentForm extends Component {

  constructor(props){
    super(props);
    console.log('In StudentForm constructor', this.props);
    this.state = this.stateIfPassed(this.props.student)
    console.log(this.state)
    this.onHandleSubmit=this.onHandleSubmit.bind(this);
    this.onHandleChange=this.onHandleChange.bind(this);
  }

  stateIfPassed(student){
    return {
      id: student && student.id? student.id: '',
      firstName: student && student.id? student.firstName: '',
      lastName: student && student.id? student.lastName: '',
      email: student && student.id? student.email: '',
      imageUrl: student && student.id? student.imageUrl: '',
      gpa: student && student.id? student.gpa: '',
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.student && this.props.student.id && !prevProps.student.id){
      this.setState(this.stateIfPassed(this.props.student));
    }
  }

  onHandleSubmit(event){
        event.preventDefault();
        let submitObj = {...this.state}
        if(submitObj.imageUrl === ''){
            delete submitObj.imageUrl;
        }
        if(submitObj.gpa === ''){
            delete submitObj.gpa;
        }
        if(submitObj.id){
          console.log('editStudent')
          this.props.editStudent(submitObj)
            .catch((error)=>console.log(error));
        }
        else{
          console.log('createstudent')
          this.props.saveStudent(submitObj)
            .catch((error)=>console.log(error)); 
        } 
  }

  onHandleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render () {
    console.log('In StudentForm render match.params.id', this.state)
    return (
      <div>
      <form>
        <div>
        <label htmlFor='firstName'>First Name</label>
        <input className="form-control"
          name='firstName' type='text'
          value={this.state.firstName}
          onChange={this.onHandleChange}
        />
        </div>
        <div>
        <label htmlFor='lastName'>Last Name</label>
        <input className="form-control"
          name='lastName' type='text'
          value={this.state.lastName}
          onChange={this.onHandleChange}
        />
        </div>
        <div>
        <label htmlFor='email'>Email</label>
        <input className="form-control"
          name='email' type='text' 
          value={this.state.email}
          onChange={this.onHandleChange}
        />
        </div>
        <div>
        <label htmlFor='gpa'>GPA[Not Judging You]</label>
        <input className="form-control"
          name='gpa' type='number' min="0.0" max="4.0"
          value={this.state.gpa}
          onChange={this.onHandleChange}
        />
        </div>
        <div>
        <label htmlFor='imageUrl'>Image URL</label>
        <input className="form-control"
          name='imageUrl' type='text'  
          value={this.state.imageUrl}
          onChange={this.onHandleChange}
        />
        </div>
        <br/>
        <button onClick={this.onHandleSubmit} className="btn btn-primary">Submit</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  let tempstudent = {};
  if(state.students){
    tempstudent = state.students.find(item => item.id===1*match.params.id);
  }
  else {
    tempstudent = {};
  }
  return {
    student : tempstudent
  }
}
const mapDispatchToProps =  (dispatch,  {history}) => {
    return {
        saveStudent: (student) => {
          history.push('/students');
          return dispatch(saveStudentThunk(student, history));
        },
        editStudent: (student) => {
          history.push('/students');
          return dispatch(editStudentThunk(student, history));
        },
    }
}

StudentForm.propTypes = {
    history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
