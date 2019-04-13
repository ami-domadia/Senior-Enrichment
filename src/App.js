import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { getCampusThunk, getStudentThunk } from './store';
import Home from './Home';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentPage from './StudentPage';
import CampusPage from './CampusPage';

import CampusList from './CampusList';
// import CampusPage from './CampusPage';

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
            <Route exact path='/campuses' render={(()=>CampusList({campuses: this.props.campuses}))} />
            <Route exact path='/students' render={(()=>StudentList({students: this.props.students}))} />
            <Route exact path='/campuses/:id' render={({match})=><CampusPage students={this.props.students} campuses= {this.props.campuses} id= {match.params.id} />}/>
            {/* <Route exact path='/students/:id' render={(()=>StudentPage({students: this.props.students}))} /> */}
            {/* <Route path='/students/create' component={StudentForm}/> */}
            <Route exact path='/students/:id' render={({match})=><StudentPage students={this.props.students} campuses= {this.props.campuses} id= {match.params.id} />}/>
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


