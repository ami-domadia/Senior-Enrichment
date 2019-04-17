import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentPage from './StudentPage';
import CampusPage from './CampusPage';
import CampusList from './CampusList';
import CampusForm from './CampusForm';
import Nav from './Nav';

 export default class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
          <Router>
            {/* <Route render={(({location})=>
                                      Nav({location}))}/> */}
            <Route component={Nav}/>
            <Switch>
              <Route exact path='/campuses' component={CampusList}/>
              <Route exact path='/students' component={StudentList}/>
              <Route exact path='/campuses/save/' component={CampusForm}/>
              <Route exact path='/students/save/' component={StudentForm}/>
              <Route exact path='/campuses/save/:id' component={CampusForm}/>
              <Route exact path='/students/save/:id' component={StudentForm}/>
              <Route exact path='/campuses/:id' component={CampusPage}/>
              <Route exact path='/students/:id' component={StudentPage}/>
              <Route exact path='/' component={Home}/>
            </Switch>
            </Router>
      </div>
    );
  }
}
