import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Campus from './Campus';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {getCampusThunk, getStudentThunk} from './store';

class CampusList extends Component{
    constructor(props){
        super(props);
    }

    async componentDidMount () {
        await this.props.getCampuses();  
        await this.props.getStudents();  
    }

    render(){   
        const campuses = this.props.campuses;
        console.log(campuses);
        if(campuses && campuses.length>0){
        return (
            <div>
                    <div align="left">
                        <Link to='/campuses/save'>Build New Campus</Link>
                    </div>
                    
                    <ul className="list-group">
                    { campuses!==[] && campuses!==undefined? campuses.map(campus => <Campus key={campus.id} campus={campus} history={this.props.history}/>): ''}

                    </ul>
             </div>)}
          else {
            return(
              <div>Loading...</div>
            )
          }
    }
}

CampusList.proptypes = {
    campuses: PropTypes.Array,
}

const mapStateToProps = (state) => {
    return {
      campuses: state!=={} && state.campuses !== undefined? state.campuses: false,
      students: state!=={} && state.students !== undefined? state.students: false

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: ()=>dispatch(getStudentThunk()),
        getCampuses: ()=>dispatch(getCampusThunk())    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

