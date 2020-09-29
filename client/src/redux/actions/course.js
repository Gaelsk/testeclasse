import {
  GET_COURSES,
  GET_COURSE,
  ADD_NEW_COURSE,
  SET_LOADING_COURSES,
  SET_LOADING_COURSE,
  DELETE_COURSE,
  ADD_COMMENT,
  SET_ADDING_COMMENT,
  DELETE_COMMENT,
  DOWNLOAD_COURSE,
} from "../types";
import axios from "axios";
import storage from "../../firebase"

const getCourses = (params, limit = 0) => dispatch => {
  const URL = limit ? `/courses?limit=${limit}` : "/courses";
  dispatch({ type: SET_LOADING_COURSES, payload: { loading: true } });
  axios
    .get(URL, { params })
    .then(res => {
      dispatch({ type: GET_COURSES, payload: { courses: res.data } });
      dispatch({ type: SET_LOADING_COURSES, payload: { loading: false } });
    })
    .catch(e => {
      console.error(e)
      dispatch({ type: GET_COURSES, payload: { courses: [] } });
      dispatch({ type: SET_LOADING_COURSES, payload: { loading: false } });
    });
};
const getCourse = id => dispatch => {
  dispatch({ type: SET_LOADING_COURSE, payload: { loading: true } });
  axios
    .get(`/courses/${id}`)
    .then(res => {
      dispatch({ type: GET_COURSE, payload: { course: res.data } });
      dispatch({ type: SET_LOADING_COURSE, payload: { loading: false } });
    })
    .catch(e => console.error(e));
};

const addCourse = newCourse => dispatch => {
  console.log("added", newCourse);
  dispatch({ type: ADD_NEW_COURSE, payload: { newCourse } });
};

const deleteCourse = (courseId, url) => dispatch => {
  const x = url.split("/")[url.split("/").length - 1];
    const y = x.split("?")[0]
    const name = y.split("%2F")[y.split("%2F").length -1]
    storage.ref().child(`cours/${name}`).delete().then(res => {
axios
    .delete(`/courses/${courseId}`)
    .then(() => {
      dispatch({
        type: DELETE_COURSE,
        payload: { courseId }
      });
    })
    .catch(e => {
      console.error(e);
    });
    });
  
};

const downloadCourse = courseId => dispatch => {
  axios.get(`/courses/${courseId}/download`).then(() => {
    dispatch({ type: DOWNLOAD_COURSE });
  });
};
//comment

const addComment = (courseId, text) => dispatch => {
  dispatch({ type: SET_ADDING_COMMENT, payload: { adding_comment: true } });
  axios
    .post(`/courses/${courseId}/comments`, { text })
    .then(res => {
      dispatch({ type: ADD_COMMENT, payload: { comment: res.data } });
      dispatch({
        type: SET_ADDING_COMMENT,
        payload: { adding_comment: false }
      });
    })
    .catch(e => console.log(e));
};

const deleteComment = commentId => dispatch => {
  axios.delete(`/comments/${commentId}`).then(() => {
    dispatch({ type: DELETE_COMMENT, payload: { commentId } });
  });
};

export {
  getCourses,
  getCourse,
  addCourse,
  deleteCourse,
  downloadCourse,
  addComment,
  deleteComment,
};
