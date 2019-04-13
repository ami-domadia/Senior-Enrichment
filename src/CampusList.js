import React, { Component } from 'react';
import Campus from './Campus';

const CampusList = (props) => {

        const campuses = props.campuses;
        console.log(campuses);
        return (
            <div>
                <ul className="list-group">
                { campuses.map(campus => <Campus campus={campus} key={campus.id} deleteCampus={props.deleteCampus} />) }
                </ul>
            </div>
        );
}

export default CampusList;

