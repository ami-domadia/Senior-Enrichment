import React, {Component} from 'react';
import {connect} from 'react-redux';
import { saveCampusThunk, editCampusThunk } from './store';
import PropTypes from 'prop-types';

class CampusForm extends Component {

  constructor(props){
    super(props);
    console.log('In CampusForm constructor')
    this.state = this.stateIfPassed(this.props.campus)
    console.log(this.state)
    this.onHandleSubmit=this.onHandleSubmit.bind(this);
    this.onHandleChange=this.onHandleChange.bind(this);
  }

  stateIfPassed(campus){
    return {
      id: campus && campus.id? campus.id: '',
      name: campus && campus.id? campus.name: '',
      description: campus && campus.id? campus.description: '',
      address: campus && campus.id? campus.address: '',
      imageUrl: campus && campus.id? campus.imageUrl: ''    }
  }

  componentDidUpdate(prevProps){
    if(this.props.campus && this.props.campus.id && !prevProps.campus.id){
      this.setState(this.stateIfPassed(this.props.campus));
    }
  }

  onHandleSubmit(event){
    event.preventDefault();
    let submitObj = {...this.state};
    if(submitObj.imageUrl === ''){
      delete submitObj.imageUrl;
    }
    if(submitObj.description === ''){
      delete submitObj.description;
    }
    if(submitObj.id){
      this.props.editCampus(submitObj)
        .catch((error)=>console.log(error));
    }
    else{
      this.props.saveCampus(submitObj)
      .catch((error)=>console.log(error));
    }
    
  }

  onHandleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render () {
    console.log('In CampusForm render')
    
    return (
      <div>
      <form>
        <div>
        <label htmlFor='name'>Name</label>
        <input className="form-control"
          name='name' type='text'
          value={this.state?this.state.name:''}
          onChange={this.onHandleChange}
        />
        </div>
        <div>
        <label htmlFor='address'>Country</label>
        <input className="form-control"
          name='address' type='text' 
          value={this.state.address}
          onChange={this.onHandleChange}
        />
        </div>
        <div>
        <label htmlFor='description'>Description[Optional]</label>
        <input className="form-control"
          name='description' type='text'  
          value={this.state.description}
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
  let tempcampus = {};
  if(state.campuses){
    tempcampus = state.campuses.find(item => item.id===1*match.params.id);
  }
  else {
    tempcampus = {};
  }
  return {
    campus : tempcampus
  }
}

const mapDispatchToProps =  (dispatch,  {history}) => {
    return {
        saveCampus: (campus) =>{
          history.push('/campuses');
          return dispatch(saveCampusThunk(campus, history));
        },
        editCampus: (campus) =>{
          history.push('/campuses');
          return dispatch(editCampusThunk(campus, history));
        },
    }
}

CampusForm.propTypes = {
    history: PropTypes.object,
    campus: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
