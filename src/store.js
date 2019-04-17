import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { combineReducers } from 'redux';

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

export const saveStudentThunk = (student, history) => {
    return dispatch => {
        return axios[student.id? 'put': 'post'](`/api/students/`, student)
            .then(()=>history.push('/students'))
            .then(()=>axios.get('/api/students'))
            .then(({ data }) => {
                return dispatch(setStudents(data))
            })
    }
}

export const saveCampusThunk = (campus, history) => {
    return dispatch => {
        // return axios[campus.id? 'put': 'post'](`/api/campuses/${campus.id? campus.id:''}`, campus)
        return axios[campus.id? 'put': 'post'](`/api/campuses/`, campus)
            .then(()=>history.push('/campuses'))
            .then(()=>axios.get('/api/campuses'))
            .then(({ data }) =>  {
                return dispatch(setCampuses(data));
            })
        
    }
}

export const editStudentThunk = (student, history) => {
    return dispatch => {
        return axios.put(`/api/students/${student.id}`, student)
            .then(()=>history.push('/students'))
            .then(()=>axios.get('/api/students'))
            .then(({ data }) => {
                return dispatch(setStudents(data))
            })
    }
}

export const editCampusThunk = (campus, history) => {
    return dispatch => {
        return axios.put(`/api/campuses/${campus.id}`, campus)
            .then(()=>history.push('/campuses'))
            .then(()=>axios.get('/api/campuses'))
            .then(({ data }) => {
                return dispatch(setCampuses(data))
            })
    }
}

export const deleteStudentThunk = (id) => {
    return dispatch => {
        return axios.delete(`/api/students/${id}`)
            .then(()=>axios.get('/api/students'))
            .then(({ data }) => {
                return dispatch(setStudents(data))
            })
    }
}

export const deleteCampusThunk = (id) => {
    return dispatch => {
        return axios.delete(`/api/campuses/${id}`)
            .then(()=>axios.get('/api/campuses'))
            .then(({ data }) => {
                return dispatch(setCampuses(data))
            })
    }
}

export const reducer = (state = initialState, action) => {
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