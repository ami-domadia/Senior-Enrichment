import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

const initialState = {
    students: [],
    campuses: [],
};

const SET_CAMPUSES = 'SET_CAMPUSES';
const SET_STUDENTS = 'SET_STUDENTS';

export const setCampuses = (campuses) => {
    return {
        type: SET_CAMPUSES,
        campuses
    }
}

export const setStudents = (students) => {
    return {
        type: SET_STUDENTS,
        students
    }
}

export const getCampusThunk = () => {
    return dispatch => {
        return axios.get('/api/campuses')
            .then(({ data }) => {
                return dispatch(setCampuses(data))
            })
    }
}

export const getStudentThunk = () => {
    return dispatch => {
        return axios.get('/api/students')
            .then(({ data }) => {
                return dispatch(setStudents(data))
            })
    }
}

export const reducer = (state = {students: []}, action) => {
    switch (action.type) {
        case SET_STUDENTS: return {...state, students: action.students}
        case SET_CAMPUSES: return {...state, campuses: action.campuses}
        default: return state
    }
}

// export const campusReducer = (state = {campuses: []}, action) => {
//     switch (action.type) {
//         case SET_CAMPUSES: return {...state, campuses: action.campuses}
//         default: return state
//     }
// }

//let rootReducer = combineReducers({student: studentReducer, campus: campusReducer})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
    )
);