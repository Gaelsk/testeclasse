import {
  ADD_NEW_COURSE,
  GET_COURSES,
  GET_COURSE,
  DOWNLOAD_COURSE,
  SET_LOADING_COURSES,
  SET_LOADING_COURSE,
  DELETE_COURSE,
  ADD_COMMENT,
  SET_ADDING_COMMENT,
  DELETE_COMMENT
} from "../types";

const initialState = {
  courses: [],
  course: null,
  loading: false,
  loading_course: false,
  adding_comment: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COURSE:
      return {
        ...state,
        courses: [action.payload.newCourse, ...state.courses]
      };
    case GET_COURSES:
      return { ...state, courses: action.payload.courses };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          course => course._id !== action.payload.courseId
        )
      };
    case GET_COURSE:
      return { ...state, course: action.payload.course };
    case SET_LOADING_COURSES:
      return { ...state, loading: action.payload.loading };
    case SET_LOADING_COURSE:
      return { ...state, loading_course: action.payload.loading };
    case DOWNLOAD_COURSE:
      return {
        ...state,
        course: {
          ...state.course,
          downloadCount: state.course.downloadCount + 1
        }
      };
    case SET_ADDING_COMMENT:
      return { ...state, adding_comment: action.payload.adding_comment };

    case ADD_COMMENT:
      const commentsCount = state.course.commentsCount + 1;
      const i = state.courses.findIndex(
        course => course._id === state.course._id
      );
      const courses = state.courses.map((course, index) => {
        if (index === i) {
          return { ...state.courses[i], commentsCount };
        } else {
          return course;
        }
      });
      return {
        ...state,
        courses,
        course: {
          ...state.course,
          comments: [action.payload.comment, ...state.course.comments],
          commentsCount
        }
      };

    case DELETE_COMMENT:
      const deleteCount = state.course.commentsCount - 1;
      const comments = state.course.comments.filter(
        comment => comment._id !== action.payload.commentId
      );

      const ind = state.courses.findIndex(
        course => course._id === state.course._id
      );
      const coursesUpdated = state.courses.map((course, index) => {
        if (index === ind) {
          return { ...state.courses[ind], commentsCount: deleteCount };
        } else {
          return course;
        }
      });

      return {
        ...state,
        courses: coursesUpdated,
        course: {
          ...state.course,
          comments,
          commentsCount: deleteCount
        }
      };
    default:
      return state;
  }
};
