import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';
import { getCampusThunk, getStudentThunk, deleteCampusThunk, deleteStudentThunk } from './store';
import Home from './Home';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentPage from './StudentPage';
import CampusPage from './CampusPage';
import CampusList from './CampusList';
import CampusForm from './CampusForm';


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
            <Switch>
              <Route exact path='/campuses' render={(()=>CampusList({campuses: this.props.campuses, deleteCampus: this.props.deleteCampus}))} />
              <Route exact path='/students' render={(()=>StudentList({students: this.props.students, deleteStudent: this.props.deleteStudent}))} />
              <Route exact path='/campuses/save' render={({ history, match }) => <CampusForm match={match} history={history} />}/>
              <Route exact path='/campuses/:id' render={({match})=><CampusPage students={this.props.students} campuses= {this.props.campuses} deleteCampus={this.props.deleteCampus} deleteStudent={this.props.deleteStudent} id= {match.params.id} />}/>
              <Route exact path='/students/:id' render={({match})=><StudentPage students={this.props.students} campuses= {this.props.campuses} deleteStudent={this.props.deleteStudent} id= {match.params.id} />}/>
              <Route exact path='/' component={Home} />
            </Switch>
            </Router>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  if(!state.students || !state.campuses){
    return {}
  }
  return {students : state.students, campuses: state.campuses};
}

const mapDispatchToProps =  (dispatch)=>{
 return {
      getStudents: () => dispatch(getStudentThunk()),
      getCampuses: () => dispatch(getCampusThunk()),
      deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
      deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
 };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);