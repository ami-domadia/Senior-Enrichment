import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteCampusThunk} from './store';
import PropTypes from 'prop-types';

class Campus extends Component{

  constructor(props){
    super(props);
  }

  render(){
    console.log('In campus render', this.props);
    const campus = this.props.campus;
    if(campus){
      return (
        <div id='campus'>
            <li className="list-group-item">
                <img src={ campus.imageUrl} /><br/>
                <Link to={`/campuses/${campus.id}`}>{ campus.name }</Link>
                <h4>{ campus.address }</h4>
                <button onClick={()=> this.props.deleteCampus(campus.id)} className="btn btn-danger">SHUTDOWN CAMPUS</button>
                <Link to={`/campuses/save/${campus.id}`}>EDIT</Link>
            </li>
        </div>
      
      )
    } else {
      return(
        <div>Loading...</div>
      )
    }
  } 

}

Campus.propTypes = {
  deleteCampus: PropTypes.func,
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampusThunk(id))
  }
}

export default connect(null, mapDispatchToProps)(Campus);
