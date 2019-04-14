import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Campus from './Campus';
import {Link} from 'react-router-dom'; 

const CampusList = (props) => {

        const campuses = props.campuses;
        console.log(campuses);
        return (
            <div>
                <div align="right">
                    <Link to='/campuses/save'>Build New Campus</Link>
                    {/* <Link onClick={({ history }) => <CampusForm history={history} />} className="btn btn-primary">Build New Campus</button> */}
                </div>
                
                <ul className="list-group">
                { campuses.map(campus => <Campus campus={campus} key={campus.id} deleteCampus={props.deleteCampus} />) }
                </ul>
            </div>
        );
}

CampusList.proptypes = {
    campuses: PropTypes.Array,
    deleteCampus: PropTypes.function,
}

export default CampusList;

