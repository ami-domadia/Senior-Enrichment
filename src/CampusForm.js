import React, {Component} from 'react';
import {connect} from 'react-redux';
import { saveCampusThunk } from './store';
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
      name: campus? campus.name: '',
      description: campus? campus.description: '',
      address: campus? campus.address: '',
      imageUrl: campus? campus.imageUrl: ''
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.campus && !prevProps.campus){
      this.setState(this.stateFromCampus(this.props.campus));
    }
  }

  onHandleSubmit(event){
    event.preventDefault();
    // if(this.type==='create'){
      this.props.saveCampus({name: this.state.name, description: this.state.description, 
        imageUrl: this.state.imageUrl, address: this.state.address}, this.props.history);
    //}
    // else{
    //   this.props.editUser(this.state.id, {name: this.state.name, bio: this.state.bio, 
    //                         rank: this.state.rank});
    //}
   
  }

  onHandleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render (func) {
    console.log('In CampusForm render')
    // if(!this.state){
    //     return '';
    // }
    return (
      <div>
      <form>
        <div>
        <label htmlFor='name'>Name</label>
        <input className="form-control"
          name='name' type='text'
          value={this.state.name}
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
  console.log('in campusform,match.params.id ', match.params.id);
  return {
    campus: state!=={} && state.campuses !== undefined? state.campuses.find(item => item.id===match.params.id): false
  }
}
const mapDispatchToProps =  (dispatch,  {history}) => {
    return {
        saveCampus: (campus) => dispatch(saveCampusThunk(campus, history)),
    }
}

CampusForm.propTypes = {
    history: PropTypes.object,

};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
