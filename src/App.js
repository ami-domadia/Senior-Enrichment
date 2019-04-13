import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { getCampusThunk, getStudentThunk } from './store';
import Home from './Home';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import CampusList from './CampusList';
import Nav from './Nav';


 class App extends Component{
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    await this.props.getStudents();
    await this.props.getCampuses();
  }

  render(){
    return (
      <div>
          {/* <h1>Magic</h1> */}
          <Router>
            <Route render={(({location})=>
                                    Nav({location}))}/>
            <Route path='/campuses' render={(()=>CampusList({campuses: this.props.campuses}))} />
            <Route path='/students' render={(()=>StudentList({students: this.props.students}))} />
            {/* <Route path='/students/create' component={StudentForm}/> */}
            <Route exact path='/' component={Home} />
            </Router>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {students : state.students, campuses: state.campuses};
}

const mapDispatchToProps =  (dispatch)=>{
 return {
      getStudents: () => dispatch(getStudentThunk()),
      getCampuses: () => dispatch(getCampusThunk()),
 };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


